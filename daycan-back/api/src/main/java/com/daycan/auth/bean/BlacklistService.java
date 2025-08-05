package com.daycan.auth.bean;

import com.daycan.auth.TokenType;
import com.daycan.auth.repository.BannedTokenRepository;
import com.daycan.auth.token.BannedToken;
import jakarta.transaction.Transactional;
import java.time.Duration;
import java.time.Instant;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class BlacklistService {

  private final BannedTokenRepository repo;

  /* 블랙리스트 등록 */
  public void blacklist(String token, TokenType type, Instant expiry) {
    repo.save(new BannedToken(token, type, expiry));
  }

  public boolean isBlacklisted(String token) {
    return repo.existsById(token);
  }

  public boolean isBlacklisted(String token, TokenType type) {
    return repo.existsByTokenAndType(token, type);
  }

  /* 만료된 레코드 주기적 정리 ------------------------ */
  @Scheduled(cron = "0 0 * * * *")          // 매 정시
  @Transactional
  public void purgeExpired() {
    repo.deleteAllExpired(Instant.now());
  }
}
