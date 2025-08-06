package com.daycan.domain.entity;

import com.daycan.domain.enums.ActivityScore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 개인 활동 엔티티
 */
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "personal_program")
public class PersonalProgram {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "care_sheet_id", nullable = false)
  private CareSheet careSheet;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "activity_id", nullable = false)
  private Program program;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private ActivityScore score;

  @Column(name = "personal_note", length = 1000)
  private String personalNote;
}