package com.daycan.domain.entity.document;


import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.status.error.DocumentErrorStatus;
import com.daycan.domain.BaseTimeEntity;
import com.daycan.domain.entry.ProgramComment;
import com.daycan.domain.enums.DocumentStatus;
import com.daycan.domain.model.CareReportInit;
import com.daycan.domain.model.ProgramNote;
import com.daycan.domain.model.ReportReview;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "care_report")
public class CareReport extends BaseTimeEntity {

  @Id
  @Column(name = "id")
  private Long id; // document_id와 동일(공유 PK)

  @OneToOne(fetch = FetchType.LAZY, optional = false)
  @MapsId
  @JoinColumn(name = "id")
  private Document document;

  /* ─── 식사 ─── */
  @Column(length = 300)
  private String breakfastComment;
  @Column(length = 300)
  private String lunchComment;
  @Column(length = 300)
  private String dinnerComment;

  @Min(0)
  @Max(100)
  @Column(nullable = false)
  private int mealScore;

  @Column(length = 300)
  private String mealFooterComment;

  /* 건강(바이탈) */
  @Min(0)
  @Max(100)
  @Column(nullable = false)
  private int vitalScore;

  @Column(length = 300)
  private String healthFooterComment;

  /* 인지 프로그램(JSON) */
  @Type(JsonType.class)
  @Column(name = "cognitive_programs", columnDefinition = "json", nullable = false)
  private List<ProgramComment> cognitiveProgramComments = new ArrayList<>();

  @Min(0)
  @Max(100)
  @Column(nullable = false)
  private int cognitiveScore;

  @Column(length = 300)
  private String cognitiveFooterComment;

  /* 신체 프로그램(JSON) */
  @Type(JsonType.class)
  @Column(name = "physical_programs", columnDefinition = "json", nullable = false)
  private List<ProgramComment> physicalProgramComments = new ArrayList<>();

  @Min(0)
  @Max(100)
  @Column(nullable = false)
  private int physicalScore;

  @Column(length = 300)
  private String physicalFooterComment;

  @Column(nullable = false)
  private Boolean isOpen;



  /* 생성 통제 */
  private CareReport(Document doc) {
    linkDocument(doc); // 아래 불변식 통과해야 연결됨
  }

  public void openThis(){
    this.isOpen = true;
  }

  public Boolean isOpened() {
    if(this.isOpen == null) {
      return false;
    }
    return isOpen;
  }

  public static CareReport prefill(Document doc, CareReportInit init) {
    CareReport report = new CareReport(doc);
    report.updateMealSection(null, null, null, init.mealScore(), init.mealFooterComment());
    report.updateVitalSection(init.vitalScore(), init.healthFooterComment());
    report.initializePhysicalPrograms(
        init.physicalProgramNames(), init.physicalScore(), init.physicalFooterComment());
    report.initializeCognitivePrograms(
        init.cognitiveProgramNames(), init.cognitiveScore(), init.cognitiveFooterComment());
    return report;
  }

  public Integer getTotalScore() {
    return mealScore + vitalScore + cognitiveScore + physicalScore;
  }

  public void linkDocument(Document doc) {
    if (doc == null) {
      throw new IllegalArgumentException("document is null");
    }
    if (doc.getStatus() != DocumentStatus.SHEET_DONE &&
        doc.getStatus() != DocumentStatus.REPORT_PENDING &&
        doc.getStatus() != DocumentStatus.REPORT_CREATED &&
        doc.getStatus() != DocumentStatus.REPORT_REVIEWED &&
        doc.getStatus() != DocumentStatus.REPORT_SENDING &&
        doc.getStatus() != DocumentStatus.REPORT_RESERVED &&
        doc.getStatus() != DocumentStatus.REPORT_DONE) {
      throw new ApplicationException(DocumentErrorStatus.INVALID_STATUS_FOR_REPORT);
    }
    this.document = doc;
    if (doc.getCareReport() != this) {
      doc.linkCareReport(this);
    }
  }

  public void updateMealSection(
      String breakfast, String lunch, String dinner,
      Integer score, String footer
  ) {
    if (breakfast != null) {
      this.breakfastComment = breakfast;
    }
    if (lunch != null) {
      this.lunchComment = lunch;
    }
    if (dinner != null) {
      this.dinnerComment = dinner;
    }
    if (score != null) {
      this.mealScore = clamp(score, 0, 15);
    }
    if (footer != null) {
      this.mealFooterComment = footer;
    }
  }

  public void updateVitalSection(Integer score, String footer) {
    if (score != null) {
      this.vitalScore = clamp(score, 0, 55);
    }
    if (footer != null) {
      this.healthFooterComment = footer;
    }
  }

  public void syncCognitiveProgramNotes(Map<String, ProgramNote> nameToNotes, boolean replaceAll) {
    this.cognitiveProgramComments = syncProgramNotesInternal(
        this.cognitiveProgramComments, nameToNotes, replaceAll);
  }

  public void syncPhysicalProgramNotes(Map<String, ProgramNote> nameToNotes, boolean replaceAll) {
    this.physicalProgramComments = syncProgramNotesInternal(
        this.physicalProgramComments, nameToNotes, replaceAll);
  }

  public void applyReview(ReportReview review, boolean replacePrograms) {
    if (review == null) return;

    this.updateMealSection(
        review.breakfast(), review.lunch(), review.dinner(),
        null,                               // 리뷰에 점수 없음 → 스코어 미변경
        review.mealMemo()
    );

    this.updateVitalSection(null, review.healthMemo());

    if (review.physicalMemo() != null) {
      this.physicalFooterComment = review.physicalMemo();
    }
    if (review.cognitiveMemo() != null) {
      this.cognitiveFooterComment = review.cognitiveMemo();
    }

    if (review.cognitiveNotes() != null) {
      this.syncCognitiveProgramNotes(review.cognitiveNotes(), replacePrograms);
    }
    if (review.physicalNotes() != null) {
      this.syncPhysicalProgramNotes(review.physicalNotes(), replacePrograms);
    }
  }

  public List<ProgramComment> getCognitiveProgramComments() {
    return List.copyOf(cognitiveProgramComments);
  }

  public List<ProgramComment> getPhysicalProgramComments() {
    return List.copyOf(physicalProgramComments);
  }


  private static List<ProgramComment> syncProgramNotesInternal(
      List<ProgramComment> current,
      Map<String, ProgramNote> dict,
      boolean replaceAll
  ) {
    List<ProgramComment> cur = (current == null) ? new ArrayList<>() : new ArrayList<>(current);

    if (dict == null || dict.isEmpty()) {
      return replaceAll ? new ArrayList<>() : cur;
    }

    if (replaceAll) {

      List<ProgramComment> replaced = new ArrayList<>(dict.size());
      for (Map.Entry<String, ProgramNote> e : dict.entrySet()) {
        String name = safeName(e.getKey());
        ProgramNote note = e.getValue();
        replaced.add(new ProgramComment(name, nullOrNot(note.benefit()), nullOrNot(note.personalNote())));
      }
      return replaced;
    }

    Map<String, Integer> nameToIndex = new HashMap<>();
    for (int i = 0; i < cur.size(); i++) {
      ProgramComment pc = cur.get(i);
      nameToIndex.put(norm(pc == null ? null : pc.programName()), i);
    }

    for (Map.Entry<String, ProgramNote> e : dict.entrySet()) {
      String keyName = safeName(e.getKey());
      ProgramNote note = e.getValue();
      String nrm = norm(keyName);

      int idx = nameToIndex.getOrDefault(nrm, -1);
      ProgramComment newPc = new ProgramComment(
          keyName,
          nullOrNot(note.benefit()),
          nullOrNot(note.personalNote())
      );
      if (idx >= 0) {
        cur.set(idx, newPc);
      } else {
        cur.add(newPc);
        nameToIndex.put(nrm, cur.size() - 1);
      }
    }

    return cur;
  }


  private void initializeCognitivePrograms(List<String> names, Integer score, String footer) {
    this.cognitiveProgramComments = toProgramComments(names);
    if (score != null)  this.cognitiveScore = clamp(score, 0, 15);
    if (footer != null) this.cognitiveFooterComment = footer;
  }

  private void initializePhysicalPrograms(List<String> names, Integer score, String footer) {
    this.physicalProgramComments = toProgramComments(names);
    if (score != null)  this.physicalScore = clamp(score, 0, 15);
    if (footer != null) this.physicalFooterComment = footer;
  }

  private static List<ProgramComment> toProgramComments(List<String> names) {
    if (names == null || names.isEmpty()) return new ArrayList<>();
    List<ProgramComment> list = new ArrayList<>(names.size());
    for (String n : names) {
      if (n != null && !n.isBlank()) {
        list.add(new ProgramComment(n, null, null));
      }
    }
    return list;
  }

  private static int clamp(int v, int min, int max) {
    return Math.max(min, Math.min(max, v));
  }

  private static <T> List<T> copyOrEmpty(List<T> src) {
    return (src == null) ? new ArrayList<>() : new ArrayList<>(src);
  }

  private static boolean isBlank(String s) { return s == null || s.isBlank(); }
  private static String safeName(String s) { return (s == null) ? "" : s.trim(); }
  private static String norm(String s)      { return safeName(s).toLowerCase(); }
  private static String nullOrNot(String s)        { return (s == null || s.isBlank()) ? null : s; }

}
