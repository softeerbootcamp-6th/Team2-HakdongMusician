package com.daycan.config;

import javax.sql.DataSource;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Slf4j
@Configuration
@EnableJpaRepositories(basePackages = "com.daycan")
@RequiredArgsConstructor
public class SshDataSourceConfig {

  private final SshTunnelConfig tunnel;

  @Bean
  @Primary
  public DataSource dataSource(DataSourceProperties props) {
    // 반드시 먼저 포워딩 열기
    tunnel.ensureTunnel();

    log.info("JDBC URL  -> {}", props.getUrl()); // spring.datasource.url 값 그대로 출력
    return props.initializeDataSourceBuilder().build();
  }
}
