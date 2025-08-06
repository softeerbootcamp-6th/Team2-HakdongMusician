package com.daycan.config;

import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;

import jakarta.annotation.PreDestroy;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

@Slf4j
@Component
@ConfigurationProperties(prefix = "daycan.ssh")   // ← daycan.ssh.*
@Validated
@Getter
@Setter
public class SshTunnelConfig {

  /** true 면 로컬 개발 환경 → SSH 터널 사용 */
  private boolean local;

  // EC2 Jump Host
  private String jumpHost;          // daycan.ssh.jump-host
  private int    port        = 22;  // daycan.ssh.port
  private String user;              // daycan.ssh.user
  private String keyPath;           // daycan.ssh.key-path

  // 대상 RDS
  private String dbEndpoint;        // daycan.db.endpoint
  private int    dbPort      = 3306;// daycan.db.port

  /*-------------------------------------------*/
  private Session session;

  @PreDestroy
  public void close() {
    if (session != null && session.isConnected()) session.disconnect();
  }

  /** 로컬 모드일 때만 터널 오픈 후 포워딩된 LocalPort 반환 */
  public int ensureTunnel() {
    if (!local) return dbPort;  // 서버 모드면 RDS 포트 그대로
    try {
      JSch jsch = new JSch();
      jsch.addIdentity(keyPath);

      session = jsch.getSession(user, jumpHost, port);
      session.setConfig("StrictHostKeyChecking", "no");

      log.info("🔐 SSH connect {}@{}:{}...", user, jumpHost, port);
      session.connect();

      int forwarded = session.setPortForwardingL(0, dbEndpoint, dbPort);
      log.info("🚇 Forward localhost:{} → {}:{}", forwarded, dbEndpoint, dbPort);
      return forwarded;
    } catch (JSchException e) {
      close();
      throw new IllegalStateException("SSH tunnel 실패", e);
    }
  }

}
