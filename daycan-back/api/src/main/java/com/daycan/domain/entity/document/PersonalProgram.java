package com.daycan.domain.entity.document;


import com.daycan.domain.BaseTimeEntity;
import com.daycan.domain.enums.ProgramScore;
import com.daycan.domain.enums.ProgramType;
import jakarta.persistence.Column;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 개인 활동 엔티티
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(
    name = "personal_program",
    indexes = {
        @Index(name = "idx_pp_care_sheet", columnList = "care_sheet_id")
    }
)
public class PersonalProgram extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Setter
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "care_sheet_id", nullable = false, updatable = false)
  private CareSheet careSheet;

  @Column(name = "program_name", nullable = false, length = 100)
  private String programName;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private ProgramType type;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private ProgramScore score;

  public PersonalProgram(
      String programName,
      ProgramType type,
      ProgramScore score
  ) {
    this.programName = programName;
    this.type = type;
    this.score = score;
  }


  public void update(
      String programName ,
      ProgramType type,
      ProgramScore score) {
    if (programName != null) this.programName = programName;
    if (type != null) this.type = type;
    if (score != null) this.score = score;
  }

  protected void setCareSheet(CareSheet careSheet) { // 완전 private
    this.careSheet = careSheet;
  }

}

