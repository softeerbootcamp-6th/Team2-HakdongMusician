package com.daycan.auth.service;

import com.daycan.auth.model.TokenType;
import com.daycan.auth.repository.BannedTokenRepository;
import com.daycan.auth.entity.BannedToken;
import java.time.Instant;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BlacklistService {

  private final BannedTokenRepository repository;

  // 등록
  public void blacklist(String token, TokenType type, Instant expiry) {
    repository.save(new BannedToken(token, type, expiry));
  }

  // 조회
  @Transactional(readOnly = true)
  public boolean isBlacklisted(String token, TokenType type) {

    return repository.findByTokenAndType(token, type)
        .map(banned -> {
          if (banned.isExpired()) {           // 만료되었으면
            removeIfExpired(banned);
            return false;                    // 블랙리스트 아님
          }
          return true;                         // 아직 유효한 블랙리스트
        })
        .orElse(false);                          // 존재하지 않음
  }

  // 만료 정리 (쓰기 트랜잭션 필요)
  @Transactional
  public void removeIfExpired(BannedToken banned) {
    if (banned.isExpired()) repository.delete(banned);
  }

  /* 매 정시 전체 정리 (백그라운드) */
  @Scheduled(cron = "0 0 * * * *")
  @Transactional
  public void purgeExpired() {
    repository.deleteAllExpired(Instant.now());
  }
}
