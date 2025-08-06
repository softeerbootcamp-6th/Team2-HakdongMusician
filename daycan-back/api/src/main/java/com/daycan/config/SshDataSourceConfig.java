package com.daycan.config;

import javax.sql.DataSource;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
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

    // jdbc:mysql://[host]:[port]/dev 형식으로 적어두면 치환
    String raw = props.getUrl();               // ex) jdbc:mysql://localhost:[port]/dev
    int port   = tunnel.ensureTunnel();        // 로컬이면 포워딩 포트, 서버면 3306
    String host = tunnel.isLocal() ? "localhost" : tunnel.getDbEndpoint();

    String url = raw
        .replace("[host]", host)
        .replace("[port]", String.valueOf(port));

    log.info("JDBC URL  -> {}", url);

    return DataSourceBuilder.create()
        .url(url)
        .username(props.getUsername())
        .password(props.getPassword())
        .driverClassName(props.getDriverClassName())
        .build();
  }

}

