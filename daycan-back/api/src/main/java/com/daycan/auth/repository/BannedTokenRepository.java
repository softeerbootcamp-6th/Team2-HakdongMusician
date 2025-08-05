package com.daycan.auth.repository;

import com.daycan.auth.TokenType;
import com.daycan.auth.token.BannedToken;
import java.time.Instant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BannedTokenRepository extends JpaRepository<BannedToken, String> {

  boolean existsByTokenAndType(String token, TokenType type);

  @Modifying
  @Query("delete from BannedToken b where b.expiredAt < :now")
  void deleteAllExpired(@Param("now") Instant now);
}

