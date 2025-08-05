package com.daycan.domain.entity;

import com.daycan.domain.enums.CommentType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * AI 코멘트 엔티티
 */
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ai_comment")
public class AiComment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, columnDefinition = "varchar(1000)")
  private String comment;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, name = "comment_type")
  private CommentType commentType;

  @Column(name = "document_id")
  private Long documentId;
}