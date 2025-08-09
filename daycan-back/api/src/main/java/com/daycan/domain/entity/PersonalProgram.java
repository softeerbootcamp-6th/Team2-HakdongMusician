package com.daycan.domain.entity;


import com.daycan.domain.BaseTimeEntity;
import com.daycan.domain.enums.ProgramScore;
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
        @Index(name = "idx_pp_document", columnList = "document_id")
    }
)
public class PersonalProgram extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  // 문서 기준 1:N (권장) — CareSheet로 묶고 싶다면 Document 대신 CareSheet로 바꿔도 OK
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "document_id", nullable = false)
  private Document document;

  @Column(name = "program_name", nullable = false, length = 100) // 캐시용 이름
  private String programName;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private ProgramScore score;

  @Column(name = "personal_note", length = 1000)
  private String personalNote;

  public void update(ProgramScore score, String note) {
    if (score != null) this.score = score;
    if (note != null) this.personalNote = note;
  }
}

