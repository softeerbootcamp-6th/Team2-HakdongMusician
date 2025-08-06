package com.daycan.service;

import com.daycan.common.exception.ApplicationException;
import com.daycan.common.response.status.CommonErrorStatus;
import com.daycan.domain.entity.AiComment;
import com.daycan.domain.enums.CommentType;
import com.daycan.repository.AiCommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AiCommentService {

  private final AiCommentRepository aiCommentRepository;

  /**
   * 모든 AI 코멘트 조회
   */
  public List<AiComment> getAllComments() {
    return aiCommentRepository.findAll();
  }

  /**
   * ID로 AI 코멘트 조회
   */
  public AiComment getCommentById(Long id) {
    return aiCommentRepository.findById(id)
        .orElseThrow(() -> new ApplicationException(CommonErrorStatus.NOT_FOUND));
  }

  /**
   * 문서 ID로 AI 코멘트 조회
   */
  public List<AiComment> getCommentsByDocumentId(Long documentId) {
    return aiCommentRepository.findByDocumentId(documentId);
  }

  /**
   * 코멘트 타입별 조회
   */
  public List<AiComment> getCommentsByType(CommentType commentType) {
    return aiCommentRepository.findByCommentType(commentType.name());
  }

  /**
   * AI 코멘트 생성
   */
  @Transactional
  public AiComment createComment(AiComment aiComment) {
    return aiCommentRepository.save(aiComment);
  }

  /**
   * AI 코멘트 수정
   */
  @Transactional
  public AiComment updateComment(Long id, String comment, CommentType commentType) {
    AiComment existingComment = getCommentById(id);

    AiComment updatedComment = AiComment.builder()
        .id(existingComment.getId())
        .comment(comment)
        .commentType(commentType)
        .documentId(existingComment.getDocumentId())
        .build();

    return aiCommentRepository.save(updatedComment);
  }

  /**
   * AI 코멘트 삭제
   */
  @Transactional
  public void deleteComment(Long id) {
    if (!aiCommentRepository.existsById(id)) {
      throw new ApplicationException(CommonErrorStatus.NOT_FOUND);
    }
    aiCommentRepository.deleteById(id);
  }
}