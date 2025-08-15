package com.daycan.domain.entity.document;


import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.status.error.DocumentErrorStatus;
import com.daycan.domain.BaseTimeEntity;
import com.daycan.domain.entry.ProgramComment;
import com.daycan.domain.enums.DocumentStatus;
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
import java.util.List;
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

  /* 생성 통제 */
  private CareReport(Document doc) {
    linkDocument(doc); // 아래 불변식 통과해야 연결됨
  }

  public static CareReport create(Document doc) {
    return new CareReport(doc);
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

  /* 섹션 단위 업데이트 */
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
      this.mealScore = clamp(score, 0, 100);
    }
    if (footer != null) {
      this.mealFooterComment = footer;
    }
  }

  public void updateVitalSection(Integer score, String footer) {
    if (score != null) {
      this.vitalScore = clamp(score, 0, 100);
    }
    if (footer != null) {
      this.healthFooterComment = footer;
    }
  }

  public void replaceCognitivePrograms(List<ProgramComment> items, Integer score, String footer) {
    this.cognitiveProgramComments = copyOrEmpty(items);
    if (score != null) {
      this.cognitiveScore = clamp(score, 0, 100);
    }
    if (footer != null) {
      this.cognitiveFooterComment = footer;
    }
  }

  public void replacePhysicalPrograms(List<ProgramComment> items, Integer score, String footer) {
    this.physicalProgramComments = copyOrEmpty(items);
    if (score != null) {
      this.physicalScore = clamp(score, 0, 100);
    }
    if (footer != null) {
      this.physicalFooterComment = footer;
    }
  }

  public void replaceCognitiveProgramComments(
      List<ProgramComment>  cognitiveProgramComments) {
    this.cognitiveProgramComments = copyOrEmpty(cognitiveProgramComments);
  }

  public void replacePhysicalProgramComments(
      List<ProgramComment>  physicalProgramComments) {
    this.physicalProgramComments = copyOrEmpty(physicalProgramComments);
  }

  /* ── 리스트 외부 변경 차단 ── */
  public List<ProgramComment> getCognitiveProgramComments() {
    return List.copyOf(cognitiveProgramComments);
  }

  public List<ProgramComment> getPhysicalProgramComments() {
    return List.copyOf(physicalProgramComments);
  }

  /* ── 내부 유틸 ── */
  private static int clamp(int v, int min, int max) {
    return Math.max(min, Math.min(max, v));
  }

  private static <T> List<T> copyOrEmpty(List<T> src) {
    return (src == null) ? new ArrayList<>() : new ArrayList<>(src);
  }
}
