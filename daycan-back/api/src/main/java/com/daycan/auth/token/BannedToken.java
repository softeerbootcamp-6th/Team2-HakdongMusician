package com.daycan.auth.token;

import com.daycan.auth.TokenType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "banned_token")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BannedToken {

  @Id
  @Column(length = 512)
  private String token;                     // JWT 전문

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  private TokenType type;                   // ACCESS / REFRESH

  @Column(nullable = false)
  private Instant expiredAt;               // 만료 시각

  public BannedToken(String token, TokenType type, Instant expiredAt) {
    this.token     = token;
    this.type      = type;
    this.expiredAt = expiredAt;
  }

  public boolean isExpired() {
    return expiredAt.isBefore(Instant.now());
  }
}

