package com.daycan.repository;

import com.daycan.domain.entity.AiComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AiCommentRepository extends JpaRepository<AiComment, Long> {

  /**
   * 특정 문서 ID로 AI 코멘트 조회
   */
  @Query("SELECT a FROM AiComment a WHERE a.documentId = :documentId")
  List<AiComment> findByDocumentId(@Param("documentId") Long documentId);

  /**
   * 코멘트 타입별 조회
   */
  @Query("SELECT a FROM AiComment a WHERE a.commentType = :commentType")
  List<AiComment> findByCommentType(@Param("commentType") String commentType);
}