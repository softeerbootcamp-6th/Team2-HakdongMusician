package com.daycan.config;

import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;

import jakarta.annotation.PreDestroy;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

@Slf4j
@Component
@ConfigurationProperties(prefix = "daycan.ssh")
@Validated
@Getter
@Setter
public class SshTunnelConfig {

  private boolean local;

  private String jumpHost;
  private int port = 22;
  private String user;
  private String keyPath;

  private String dbEndpoint;
  private int dbPort = 3306;

  private Session session;

  @PreDestroy
  public void close() {
    if (session != null && session.isConnected()) session.disconnect();
  }

  public void ensureTunnel() {
    if (!local) return;
    try {
      JSch jsch = new JSch();
      jsch.addIdentity(keyPath);

      session = jsch.getSession(user, jumpHost, port);
      session.setConfig("StrictHostKeyChecking", "no");

      log.info("🔐 SSH connect {}@{}:{}...", user, jumpHost, port);
      session.connect();

      int forwardedPort = session.setPortForwardingL(0, dbEndpoint, dbPort);
      log.info("🚇 Forward localhost:{} → {}:{}", forwardedPort, dbEndpoint, dbPort);

      // 환경변수 오버라이드 (Spring Boot가 참조할 수 있도록)
      System.setProperty("DB_HOST", "localhost");
      System.setProperty("DB_PORT", String.valueOf(forwardedPort));

    } catch (JSchException e) {
      close();
      throw new IllegalStateException("SSH tunnel 실패", e);
    }
  }
}
