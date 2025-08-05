package com.daycan.auth.repository;

import com.daycan.auth.token.RefreshToken;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, String> {
  Optional<RefreshToken> findByToken(String token);
}

