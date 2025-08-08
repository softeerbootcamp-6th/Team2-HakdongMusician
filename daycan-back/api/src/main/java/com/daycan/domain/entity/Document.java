package com.daycan.domain.entity;

import com.daycan.domain.BaseTimeEntity;
import com.daycan.domain.enums.DocumentStatus;
import com.daycan.domain.helper.DocumentKey;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "document")
public class Document extends BaseTimeEntity {

  @EmbeddedId
  private DocumentKey id;

  @Column(name = "organization_id", nullable = false)
  private String organizationId;

  @Enumerated(EnumType.STRING)
  @Column(name = "status", nullable = false)
  private DocumentStatus status;

  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  // 단일 필드 조회를 위한 노출 필드
  @Column(name = "member_id", insertable = false, updatable = false)
  private String memberId;

  // 단일 필드 조회를 위한 노출 필드
  @Column(name = "date", insertable = false, updatable = false)
  private LocalDate date;

  public void sheetDone(){
    this.status = DocumentStatus.SHEET_DONE;
    this.updatedAt = LocalDateTime.now();
  }
}

/*
 * ─────────────────────────────────────────────────────────────────────────────
 * [설계 고민 및 기록]
 *
 * DocumentKey(memberId + date) 를 복합키로 사용하기로 결정한 이유:
 *
 * 1. Document는 본질적으로 하루에 수급자 한 명당 하나만 존재함
 *    → (memberId + date) 조합이 유일 식별자 역할을 자연스럽게 수행
 *
 * 2. 기존에는 Long id 단일 PK + 유니크 인덱스를 함께 사용했지만,
 *    - 도메인 상 자연키가 이미 존재하므로
 *    - 별도 surrogate key(id) 없이 명시적으로 사용하기로 결정
 *
 * 3. 식별자(memberId, date)는 생성 후 절대 바뀌지 않음
 *    → @Embeddable 로 immutable 키 정의 + 엔티티에서 updatable = false 설정
 *
 * 4. DB 유일성도 PK로 직접 보장되므로, 별도 unique 제약 불필요
 *
 * 복합키 도입 시 고려한 위험 요소 및 해결 방식:
 * ----------------------------------------------------------------------
 * - [문제] 연관관계 매핑이 복잡해짐
 *   [해결] 연관 엔티티에는 insertable = false, updatable = false 로 조회 전용 처리
 *
 * - [문제] equals/hashCode 구현 필요
 *   [해결] DocumentKey 내부에 직접 구현 (Lombok 안 씀)
 *
 * - [문제] 조회/저장 시 id 직접 생성해야 함
 *   [해결] DocumentKey.of(...) 정적 메서드 또는 생성자 활용
 *
 * - [문제] 단일 필드 기반 조회가 어려움 (ex. findByUsername, findByDate)
 *   [해결] 연관 엔티티에서 memberId, date를 명시적 필드로 노출 (insertable=false)
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * [결론]
 * - 단일 PK(Long id) 대신, 자연키 기반 복합키(DocumentKey)를 PK로 사용
 * - 데이터 정합성, 명확한 도메인 설계, 유일성 보장 목적
 * - 유지보수 복잡도는 다소 증가하지만, 현재 도메인에서는 수용 가능
 */

