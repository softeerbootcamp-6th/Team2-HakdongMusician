package com.daycan.domain.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "sheet")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CareSheet {

  // document_id와 동일
  @Id
  private Long id;

  @Column(nullable = false, length = 255)
  private String username;

  @Column(name = "arrival_time", length = 255)
  private String arrivalTime;

  @Column(name = "end_time", length = 255)
  private String endTime;

  @Column(name = "vehicle_provided")
  private Boolean vehicleProvided;

  @Column(length = 1000)
  private String image;

  @Column(name = "wash_care")
  private Boolean washCare;

  @Column(name = "mobilty_care")
  private Boolean mobiltyCare;

  @Column(name = "bathing_care")
  private Boolean bathingCare;

  @Column(name = "bathing_duration")
  private String bathingDuration;

  @Column(name = "bathing_type")
  private String bathingType;

  @Column(name = "breakfast_provided")
  private Boolean breakfastProvided;

  @Column(name = "breakfast_type")
  private String breakfastType; // enum 타입이면 별도 enum 정의 필요

  @Column(name = "breakfast_amount")
  private String breakfastAmount; // enum 타입이면 별도 enum 정의 필요

  @Column(length = 255)
  private String lunch;

  @Column(length = 255)
  private String dinner;

  @Column(name = "cognitive_support")
  private Boolean cognitiveSupport;

  @Column(name = "communication_support")
  private Boolean communicationSupport;

  @Column(name = "health_care")
  private Boolean healthCare;

  @Column(name = "nursing_care")
  private Boolean nursingCare;

  @Column(name = "emergency_service")
  private Boolean emergencyService;

  @Column(name = "health_training")
  private Boolean healthTraining;

  @Column(name = "congnitive_program")
  private Boolean congnitiveProgram;

  @Column(name = "cognitive_infinitive_program")
  private Boolean cognitiveInfinitiveProgram;

  @Column(name = "physical_teraphy")
  private Boolean physicalTeraphy;

  @Column(name = "functional_comment", length = 255)
  private String functionalComment;

  @Column(name = "cognitive_comment", length = 400)
  private String cognitiveComment;

  @Column(name = "health_comment", length = 255)
  private String healthComment;

  @Column(name = "physical_comment", length = 400)
  private String physicalComment;

  @OneToMany
  @JoinColumn(name = "document_id")
  private List<AiComment> aiComments;

  @ManyToMany
  @JoinTable(mappedBy = "care_sheet_id")
  private List<PersonalActivity> personalActivities;
}
