package com.daycan.domain.entity;

import com.daycan.domain.BaseTimeEntity;
import com.daycan.domain.entry.Meal;
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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import java.time.LocalTime;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
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
      @AttributeOverride(name = "type",     column = @Column(name = "breakfast_type")),
      @AttributeOverride(name = "amount",   column = @Column(name = "breakfast_amount"))
  })
  private Meal breakfast;

  @Embedded
  @AttributeOverrides({
      @AttributeOverride(name = "provided", column = @Column(name = "lunch_provided", nullable = false)),
      @AttributeOverride(name = "type",     column = @Column(name = "lunch_type")),
      @AttributeOverride(name = "amount",   column = @Column(name = "lunch_amount"))
  })
  private Meal lunch;

  @Embedded
  @AttributeOverrides({
      @AttributeOverride(name = "provided", column = @Column(name = "dinner_provided", nullable = false)),
      @AttributeOverride(name = "type",     column = @Column(name = "dinner_type")),
      @AttributeOverride(name = "amount",   column = @Column(name = "dinner_amount"))
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

  // @Size(100)와 length=300이 안 맞았던 부분 통일(길이=300, 검증=<=300)
  @Size(max = 300) @Column(name = "functional_comment", length = 300)
  private String functionalComment;

  @Size(max = 300) @Column(name = "cognitive_comment", length = 300)
  private String cognitiveComment;

  @Size(max = 300) @Column(name = "health_comment", length = 300)
  private String healthComment;

  @Size(max = 300) @Column(name = "physical_comment", length = 300)
  private String physicalComment;

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
}

