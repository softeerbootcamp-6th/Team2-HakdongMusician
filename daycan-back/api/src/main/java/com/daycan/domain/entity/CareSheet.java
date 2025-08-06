package com.daycan.domain.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
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
public class CareSheet {

  /* 기본 식별자 -------------------------------------------------------- */
  @Id
  private Long id;                                // = document_id

  /* 출‧퇴근 & 차량 ----------------------------------------------------- */
  @Column(nullable = false, length = 50)
  private String username;

  @Column(name = "arrival_time", nullable = false)
  private LocalTime arrivalTime;

  @Column(name = "end_time", nullable = false)
  private LocalTime endTime;

  @Column(name = "vehicle_provided", nullable = false)
  private boolean vehicleProvided;

  /* 이미지 ------------------------------------------------------------- */
  @Column(name = "image_url", length = 2048)      // S3 키 길이 여유
  private String imageUrl;

  /* 목욕 ---------------------------------------------------------------- */
  @Column(name = "wash_care", nullable = false)
  private boolean washCare;

  @Column(name = "mobility_care", nullable = false)   // 스펠링 수정
  private boolean mobilityCare;

  @Column(name = "bathing_care", nullable = false)
  private boolean bathingCare;

  @Column(name = "bathing_duration_minutes")
  private Integer bathingDurationMinutes;            // 분 단위

  @Column(name = "bathing_type")
  private String bathingType;                   // enum 생성

  /* 식사(Embedded 세트) -------------------------------------------------- */
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

  /* 서비스 지원 여부 ---------------------------------------------------- */
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

  @Column(name = "health_training", nullable = false)
  private boolean healthTraining;

  @Column(name = "cognitive_program", nullable = false)
  private boolean cognitiveProgram;

  @Column(name = "cognitive_initiative_program", nullable = false)
  private boolean cognitiveInitiativeProgram;          // 의미 확인 후 사용

  @Column(name = "physical_therapy", nullable = false)
  private boolean physicalTherapy;

  /* 코멘트 ------------------------------------------------------------- */
  @Column(name = "functional_comment", length = 300)
  @Size(max = 100, message = "최대 100자까지만 입력 가능합니다.")
  private String functionalComment;

  @Column(name = "cognitive_comment", length = 300)
  @Size(max = 100, message = "최대 100자까지만 입력 가능합니다.")
  private String cognitiveComment;

  @Column(name = "health_comment", length = 300)
  @Size(max = 100, message = "최대 100자까지만 입력 가능합니다.")
  private String healthComment;

  @Column(name = "physical_comment", length = 300)
  @Size(max = 100, message = "최대 100자까지만 입력 가능합니다.")
  private String physicalComment;

  /* AI 코멘트 ---------------------------------------------------------- */
  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  @JoinColumn(name = "document_id")                   // FK는 AiComment 테이블에 존재
  private List<AiComment> aiComments = new ArrayList<>();
}