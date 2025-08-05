package com.daycan.auth.repository;

import com.daycan.auth.model.TokenType;
import com.daycan.auth.entity.BannedToken;
import java.time.Instant;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BannedTokenRepository extends JpaRepository<BannedToken, String> {

  /* 토큰 + 타입으로 조회 (만료 확인·삭제용) */
  Optional<BannedToken> findByTokenAndType(String token, TokenType type);

  /* 만료 일괄 삭제  ─  스케줄러에서 호출 */
  @Modifying(clearAutomatically = true)
  @Query("delete from BannedToken b where b.expiredAt < :now")
  void deleteAllExpired(@Param("now") Instant now);
}


