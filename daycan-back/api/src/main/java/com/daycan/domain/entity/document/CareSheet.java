package com.daycan.domain.entity.document;

import static jakarta.persistence.CascadeType.*;

import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.status.error.DocumentErrorStatus;
import com.daycan.domain.BaseTimeEntity;
import com.daycan.domain.entity.Staff;
import com.daycan.domain.entry.document.sheet.Meal;
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
import jakarta.persistence.Version;
import jakarta.validation.constraints.Size;
import java.time.LocalTime;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
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

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "writer_id", nullable = false)
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
      cascade = ALL,      // CareSheet 저장/삭제 시 함께 반영해야 하면
      orphanRemoval = true            // 교체 전략이면 orphan 제거
  )
  @OrderBy("id ASC")
  private List<PersonalProgram> personalPrograms;

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
    if (p == null) {
      return false; // 조용히 무시
    }

    if (p.getProgramName() == null || p.getType() == null) {
      throw new ApplicationException(DocumentErrorStatus.PERSONAL_PROGRAM_INVALID_ARGUMENT);
    }

    // 이미 있으면 점수만 갱신하고 추가 안 함
    for (PersonalProgram cur : personalPrograms) {
      if (p.getProgramName().equals(cur.getProgramName()) && p.getType() == cur.getType()) {
        if (p.getScore() != null && p.getScore() != cur.getScore()) {
          cur.update(cur.getProgramName(), cur.getType(), p.getScore());
        }
        return false; // 새로운 insert 스케줄링 안 됨
      }
    }

    // 새로 추가
    personalPrograms.add(p);
    p.setCareSheet(this);
    return true;
  }

  public void removePersonalProgram(PersonalProgram personalProgram) {
    if (personalPrograms != null) {
      personalPrograms.remove(personalProgram);
    }
    personalProgram.setCareSheet(null);
  }

  public void replacePersonalPrograms(List<PersonalProgram> personalProgramList) {
    if (personalPrograms == null) {
      personalPrograms = new ArrayList<>();
    } else {
      personalPrograms.clear();
    }
    if (personalProgramList != null) {
      personalProgramList.forEach(this::addPersonalProgram);
    }
  }

  /**
   * 편의 오버로드: 바로 값으로 추가
   */
  public boolean addPersonalProgram(String name, ProgramType type, ProgramScore score) {
    return addPersonalProgram(new PersonalProgram(name, type, score));
  }

  /**
   * 교체 모드: 중복 없이 싹 갈아끼우기
   */
  public void replacePersonalPrograms(Collection<PersonalProgram> newOnes) {
    personalPrograms.clear();
    if (newOnes != null) {
      for (PersonalProgram p : newOnes) {
        addPersonalProgram(p);
      }
    }
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
    this.document = document;   // @MapsId라 flush 때 id가 doc.id로 들어감
    this.writer = writer;
    this.arrivalTime = arrivalTime;
    this.endTime = endTime;
    this.vehicleNumber = vehicleNumber;
    this.signatureUrl = signatureUrl;
    this.washCare = washCare;
    this.mobilityCare = mobilityCare;
    this.bathingCare = bathingCare;
    this.bathingDurationMinutes = bathingDurationMinutes;
    this.bathingType = bathingType;
    this.breakfast = breakfast;
    this.lunch = lunch;
    this.dinner = dinner;
    this.cognitiveSupport = cognitiveSupport;
    this.communicationSupport = communicationSupport;
    this.healthCare = healthCare;
    this.nursingCare = nursingCare;
    this.emergencyService = emergencyService;
    this.motionTraining = motionTraining;
    this.cognitiveProgram = cognitiveProgram;
    this.cognitiveInitiativeProgram = cognitiveInitiativeProgram;
    this.physicalTherapy = physicalTherapy;
    this.functionalComment = functionalComment;
    this.cognitiveComment = cognitiveComment;
    this.healthComment = healthComment;
    this.physicalComment = physicalComment;
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

