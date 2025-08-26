package com.daycan.domain.entity.document;

import static jakarta.persistence.CascadeType.*;

import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.status.error.DocumentErrorStatus;
import com.daycan.domain.BaseTimeEntity;
import com.daycan.domain.entity.Staff;
import com.daycan.domain.enums.ProgramScore;
import com.daycan.domain.enums.ProgramType;
import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;

import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import java.time.LocalTime;

import java.util.LinkedHashMap;
import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "care_sheet")
public class CareSheet extends BaseTimeEntity {

  @Id
  @Column(name = "id")
  private Long id; // document_id와 동일(공유 PK)

  @OneToOne(fetch = FetchType.LAZY, optional = false)
  @MapsId // id == document.id
  @JoinColumn(name = "id")
  private Document document;

  @ManyToOne(fetch = FetchType.LAZY, optional = true)
  @JoinColumn(name = "writer_id", nullable = true)
  private Staff writer;

  @Column(name = "arrival_time", nullable = false)
  private LocalTime arrivalTime;

  @Column(name = "end_time", nullable = false)
  private LocalTime endTime;

  @Column(name = "vehicle_number", nullable = false)
  private String vehicleNumber;

  @Column(name = "signature_url", length = 2048)
  private String signatureUrl;

  @Column(name = "wash_care", nullable = false)
  private boolean washCare;

  @Column(name = "mobility_care", nullable = false)
  private boolean mobilityCare;

  @Column(name = "bathing_care", nullable = false)
  private boolean bathingCare;

  @Column(name = "bathing_duration_minutes")
  private String bathingDurationMinutes;

  @Column(name = "bathing_type")
  private String bathingType;

  @Embedded
  @AttributeOverrides({
      @AttributeOverride(name = "provided", column = @Column(name = "breakfast_provided", nullable = false)),
      @AttributeOverride(name = "type", column = @Column(name = "breakfast_type")),
      @AttributeOverride(name = "amount", column = @Column(name = "breakfast_amount"))
  })
  private Meal breakfast;

  @Embedded
  @AttributeOverrides({
      @AttributeOverride(name = "provided", column = @Column(name = "lunch_provided", nullable = false)),
      @AttributeOverride(name = "type", column = @Column(name = "lunch_type")),
      @AttributeOverride(name = "amount", column = @Column(name = "lunch_amount"))
  })
  private Meal lunch;

  @Embedded
  @AttributeOverrides({
      @AttributeOverride(name = "provided", column = @Column(name = "dinner_provided", nullable = false)),
      @AttributeOverride(name = "type", column = @Column(name = "dinner_type")),
      @AttributeOverride(name = "amount", column = @Column(name = "dinner_amount"))
  })
  private Meal dinner;

  @Column(name = "cognitive_support", nullable = false)
  private boolean cognitiveSupport;

  @Column(name = "communication_support", nullable = false)
  private boolean communicationSupport;

  @Column(name = "health_care", nullable = false)
  private boolean healthCare;

  @Column(name = "nursing_care", nullable = false)
  private boolean nursingCare;

  @Column(name = "emergency_service", nullable = false)
  private boolean emergencyService;

  @Column(name = "motion_training", nullable = false)
  private boolean motionTraining;

  @Column(name = "cognitive_program", nullable = false)
  private boolean cognitiveProgram;

  @Column(name = "cognitive_initiative_program", nullable = false)
  private boolean cognitiveInitiativeProgram;

  @Column(name = "physical_therapy", nullable = false)
  private boolean physicalTherapy;

  @OneToMany(
      mappedBy = "careSheet",
      fetch = FetchType.LAZY,
      cascade = ALL,
      orphanRemoval = true
  )
  @OrderBy("id ASC")
  private Set<PersonalProgram> personalPrograms = new LinkedHashSet<>();

  @Size(max = 300)
  @Column(name = "functional_comment", length = 300)
  private String functionalComment;

  @Size(max = 300)
  @Column(name = "cognitive_comment", length = 300)
  private String cognitiveComment;

  @Size(max = 300)
  @Column(name = "health_comment", length = 300)
  private String healthComment;

  @Size(max = 300)
  @Column(name = "physical_comment", length = 300)
  private String physicalComment;

  public void linkDocument(Document doc) {
    this.document = doc;
  }

  public boolean addPersonalProgram(PersonalProgram p) {
    if (p == null) return false;
    if (p.getProgramName() == null || p.getType() == null) {
      throw new ApplicationException(DocumentErrorStatus.PERSONAL_PROGRAM_INVALID_ARGUMENT);
    }
    ensureSet();
    p.setCareSheet(this);
    // Set 동작: 동등한 항목이면 add=false 반환
    boolean added = personalPrograms.add(p);
    if (!added) {
      // 이미 있으면 점수만 갱신
      for (PersonalProgram cur : personalPrograms) {
        if (cur.equals(p)) {
          if (!Objects.equals(cur.getScore(), p.getScore())) {
            cur.update(cur.getProgramName(), cur.getType(), p.getScore());
          }
          break;
        }
      }
    }
    return added;
  }

  public void syncPersonalPrograms(Collection<PersonalProgram> incoming) {
    ensureSet();
    // incoming 정규화 & 인덱싱
    Map<String, PersonalProgram> incMap = (incoming == null ? Map.of() :
        incoming.stream()
            .filter(Objects::nonNull)
            .filter(pp -> pp.getProgramName() != null && pp.getType() != null)
            .collect(Collectors.toMap(
                pp -> key(pp.getProgramName(), pp.getType()),
                Function.identity(),
                (oldV, newV) -> newV,
                LinkedHashMap::new
            ))
    );

    for (PersonalProgram in : incMap.values()) {
      addPersonalProgram(new PersonalProgram(in.getProgramName(), in.getType(), in.getScore()));
    }

    Set<String> keep = incMap.keySet();
    Iterator<PersonalProgram> it = personalPrograms.iterator();
    while (it.hasNext()) {
      PersonalProgram cur = it.next();
      if (!keep.contains(key(cur.getProgramName(), cur.getType()))) {
        it.remove();
        cur.setCareSheet(null);
      }
    }
  }

  private static String key(String name, ProgramType type) {
    return name + "\u0001" + type.name();
  }



  private void ensureSet() {
    if (personalPrograms == null) personalPrograms = new LinkedHashSet<>();
  }

  public void removePersonalProgram(PersonalProgram personalProgram) {
    if (personalPrograms != null) {
      personalPrograms.remove(personalProgram);
    }
    personalProgram.setCareSheet(null);
  }

  public void removeWriter(){
    if (writer != null) {
      writer = null; // Staff와의 연관관계 제거
    }
  }
  public boolean addPersonalProgram(String name, ProgramType type, ProgramScore score) {
    return addPersonalProgram(new PersonalProgram(name, type, score));
  }


  @Builder
  private CareSheet(
      Document document,
      Staff writer,
      LocalTime arrivalTime,
      LocalTime endTime,
      String vehicleNumber,
      String signatureUrl,
      boolean washCare,
      boolean mobilityCare,
      boolean bathingCare,
      String bathingDurationMinutes,
      String bathingType,
      Meal breakfast,
      Meal lunch,
      Meal dinner,
      boolean cognitiveSupport,
      boolean communicationSupport,
      boolean healthCare,
      boolean nursingCare,
      boolean emergencyService,
      boolean motionTraining,
      boolean cognitiveProgram,
      boolean cognitiveInitiativeProgram,
      boolean physicalTherapy,
      String functionalComment,
      String cognitiveComment,
      String healthComment,
      String physicalComment
  ) {
    this.document = document;
    this.writer = writer;
    this.arrivalTime = Objects.requireNonNullElse(arrivalTime, LocalTime.MIN);
    this.endTime = Objects.requireNonNullElse(endTime, LocalTime.MIN);
    this.vehicleNumber = Objects.requireNonNullElse(vehicleNumber, "");
    this.signatureUrl = Objects.requireNonNullElse(signatureUrl, "");

    this.washCare = washCare;
    this.mobilityCare = mobilityCare;
    this.bathingCare = bathingCare;

    this.bathingDurationMinutes = Objects.requireNonNullElse(bathingDurationMinutes, "");
    this.bathingType = Objects.requireNonNullElse(bathingType, "");

    this.breakfast = Objects.requireNonNullElse(breakfast, new Meal());
    this.lunch = Objects.requireNonNullElse(lunch, new Meal());
    this.dinner = Objects.requireNonNullElse(dinner, new Meal());

    this.cognitiveSupport = cognitiveSupport;
    this.communicationSupport = communicationSupport;
    this.healthCare = healthCare;
    this.nursingCare = nursingCare;
    this.emergencyService = emergencyService;
    this.motionTraining = motionTraining;
    this.cognitiveProgram = cognitiveProgram;
    this.cognitiveInitiativeProgram = cognitiveInitiativeProgram;
    this.physicalTherapy = physicalTherapy;
    this.functionalComment = Objects.requireNonNullElse(functionalComment, "");
    this.cognitiveComment = Objects.requireNonNullElse(cognitiveComment, "");
    this.healthComment = Objects.requireNonNullElse(healthComment, "");
    this.physicalComment = Objects.requireNonNullElse(physicalComment, "");
  }


  public void update(
      LocalTime arrivalTime,
      LocalTime endTime,
      String vehicleNumber,
      String signatureUrl,
      boolean washCare,
      boolean mobilityCare,
      boolean bathingCare,
      String bathingDurationMinutes,
      String bathingType,
      Meal breakfast,
      Meal lunch,
      Meal dinner,
      boolean cognitiveSupport,
      boolean communicationSupport,
      boolean healthCare,
      boolean nursingCare,
      boolean emergencyService,
      boolean motionTraining,
      boolean cognitiveProgram,
      boolean cognitiveInitiativeProgram,
      boolean physicalTherapy,
      String functionalComment,
      String cognitiveComment,
      String healthComment,
      String physicalComment
  ) {
    if (arrivalTime != null) {
      this.arrivalTime = arrivalTime;
    }
    if (endTime != null) {
      this.endTime = endTime;
    }
    if (vehicleNumber != null) {
      this.vehicleNumber = vehicleNumber;
    }
    if (signatureUrl != null) {
      this.signatureUrl = signatureUrl;
    }
    if (washCare != this.washCare) {
      this.washCare = washCare;
    }
    if (mobilityCare != this.mobilityCare) {
      this.mobilityCare = mobilityCare;
    }
    if (bathingCare != this.bathingCare) {
      this.bathingCare = bathingCare;
    }
    if (bathingDurationMinutes != null) {
      this.bathingDurationMinutes = bathingDurationMinutes;
    }
    if (bathingType != null) {
      this.bathingType = bathingType;
    }
    if (breakfast != null) {
      this.breakfast = breakfast;
    }

    if (lunch != null) {
      this.lunch = lunch;
    }
    if (dinner != null) {
      this.dinner = dinner;
    }
    if (cognitiveSupport != this.cognitiveSupport) {
      this.cognitiveSupport = cognitiveSupport;
    }
    if (communicationSupport != this.communicationSupport) {
      this.communicationSupport = communicationSupport;
    }
    if (healthCare != this.healthCare) {
      this.healthCare = healthCare;
    }
    if (nursingCare != this.nursingCare) {
      this.nursingCare = nursingCare;
    }
    if (emergencyService != this.emergencyService) {
      this.emergencyService = emergencyService;
    }
    if (motionTraining != this.motionTraining) {
      this.motionTraining = motionTraining;
    }
    if (cognitiveProgram != this.cognitiveProgram) {
      this.cognitiveProgram = cognitiveProgram;
    }
    if (cognitiveInitiativeProgram != this.cognitiveInitiativeProgram) {
      this.cognitiveInitiativeProgram = cognitiveInitiativeProgram;
    }
    if (physicalTherapy != this.physicalTherapy) {
      this.physicalTherapy = physicalTherapy;
    }
    if (functionalComment != null) {
      this.functionalComment = functionalComment;
    }
    if (cognitiveComment != null) {
      this.cognitiveComment = cognitiveComment;
    }
    if (healthComment != null) {
      this.healthComment = healthComment;
    }
    if (physicalComment != null) {
      this.physicalComment = physicalComment;
    }
  }

}

