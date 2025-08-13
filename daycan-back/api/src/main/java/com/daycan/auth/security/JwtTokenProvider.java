package com.daycan.auth.security;

import com.daycan.auth.dto.Token;
import com.daycan.common.exceptions.ApplicationException;
import com.daycan.common.response.status.error.AuthErrorStatus;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import java.security.Key;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

  /* ---------------- 상수 ---------------- */
  @Value("${jwt.access-token.expire-length}")
  private Long ACCESS_TOKEN_EXPIRATION_MS;
  @Value("${jwt.refresh-token.expire-length}")
  private Long REFRESH_TOKEN_EXPIRATION_MS; // 14일
  @Value("${jwt.custom.secretKey}")
  private String SECRET_KEY;

  private Key key;

  @PostConstruct
  public void init() {
    this.key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
  }

  /* =================================================
     1) 토큰 생성
     ================================================= */
  public Token createAccessToken(String subject)  { return createToken(subject, ACCESS_TOKEN_EXPIRATION_MS); }
  public Token createRefreshToken(String subject) { return createToken(subject, REFRESH_TOKEN_EXPIRATION_MS); }

  private Token createToken(String subject, long validityMs) {
    Date now    = new Date();
    Date expiry = new Date(now.getTime() + validityMs);

    String jwt = Jwts.builder()
        .setSubject(subject)
        .setIssuedAt(now)
        .setExpiration(expiry)
        .signWith(key, SignatureAlgorithm.HS256)
        .compact();

    return new Token(jwt, expiry);   // Date 타입으로 반환
  }

  /* =================================================
     2) subject 파싱
     ================================================= */
  public String parseSubject(Token token) { return parseSubject(token.value()); }

  public String parseSubject(String token) {
    try {
      return Jwts.parserBuilder()
          .setSigningKey(key)
          .build()
          .parseClaimsJws(token)
          .getBody()
          .getSubject();
    } catch (ExpiredJwtException e) {
      throw new ApplicationException(AuthErrorStatus.EXPIRED_TOKEN);
    } catch (JwtException | IllegalArgumentException e) {
      throw new ApplicationException(AuthErrorStatus.MALFORMED_TOKEN);
    }
  }

  /* =================================================
     3) 만료일 확인
     ================================================= */
  public Date getExpiry(String rawToken) {
    return Jwts.parserBuilder()
        .setSigningKey(key)
        .build()
        .parseClaimsJws(rawToken)
        .getBody()
        .getExpiration();
  }

  /* =================================================
     4) 유효성 검사
     ================================================= */
  public boolean validate(String token) {
    try {
      Jwts.parserBuilder()
          .setSigningKey(key)
          .build()
          .parseClaimsJws(token);
      return true;
    } catch (JwtException | IllegalArgumentException e) {
      return false;
    }
  }
}
