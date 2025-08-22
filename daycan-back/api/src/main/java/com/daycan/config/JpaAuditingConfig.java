package com.daycan.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableJpaAuditing(dateTimeProviderRef = "dateTimeProvider")
public class JpaAuditingConfig {

  @Bean
  public org.springframework.data.auditing.DateTimeProvider dateTimeProvider() {
    return () -> java.util.Optional.of(java.time.OffsetDateTime.now(java.time.ZoneId.of("Asia/Seoul")));
  }
}
