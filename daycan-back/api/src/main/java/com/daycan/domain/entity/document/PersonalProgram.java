package com.daycan.domain.entity.document;


import static jakarta.persistence.FetchType.LAZY;

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
import jakarta.persistence.UniqueConstraint;
import java.util.Objects;
import lombok.Getter;
import lombok.NoArgsConstructor;


/**
 * 개인 활동 엔티티
 */
@Getter
@Entity
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@Table(
    name = "personal_program",
    uniqueConstraints = @UniqueConstraint(
        name = "uk_pp_sheet_name_type",
        columnNames = {"care_sheet_id","program_name","type"}
    ),
    indexes = {
        @Index(name = "idx_pp_care_sheet", columnList = "care_sheet_id")
    }
)
public class PersonalProgram extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = LAZY, optional = false)
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

  // --- 도메인 생성자 ---
  public PersonalProgram(String programName, ProgramType type, ProgramScore score) {
    this.programName = Objects.requireNonNull(programName, "programName");
    this.type = Objects.requireNonNull(type, "type");
    this.score = Objects.requireNonNull(score, "score");
  }

  public void update(String programName, ProgramType type, ProgramScore score) {
    if (programName != null) this.programName = programName;
    if (type != null) this.type = type;
    if (score != null) this.score = score;
  }

  // CareSheet 쪽 컬렉션 헬퍼에서만 세팅되도록 가시성 낮춤
  protected void setCareSheet(CareSheet careSheet) {
    this.careSheet = careSheet;
  }
}
