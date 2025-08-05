package com.daycan.auth.token;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "refresh_token")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RefreshToken {

  @Id
  private String userId; // "CENTER:123456" or "MEMBER:AA123"

  @Column(nullable = false, unique = true)
  private String token;

  @Column(nullable = false)
  private Instant expiration;

  public RefreshToken(String userId, String token, Instant expiration) {
    this.userId = userId;
    this.token = token;
    this.expiration = expiration;
  }

  public boolean isExpired() {
    return expiration.isBefore(Instant.now());
  }

  public void updateToken(String newToken, Instant newExpiration) {
    this.token = newToken;
    this.expiration = newExpiration;
  }
}

