#!/bin/bash
set -euo pipefail

# 디렉터리 준비
mkdir -p /etc/daycan /var/log/daycan

# 권한 정리
chown -R daycan:daycan /opt/daycan
chmod -R 755 /opt/daycan/scripts

# 스크립트 개행 정리(CRLF 방지)
if command -v sed >/dev/null 2>&1; then
  find /opt/daycan/scripts -type f -name "*.sh" -exec sed -i -e 's/\r$//' {} \; || true
fi

# env 파일 설치 (systemd가 읽을 수 있는 KEY=VALUE만 들어있어야 함)
# ※ 여기서도 CRLF 방지
if [ -f /opt/daycan/daycan.env ]; then
  sed -e 's/\r$//' /opt/daycan/daycan.env > /etc/daycan/daycan.env
  chmod 640 /etc/daycan/daycan.env
  chown root:daycan /etc/daycan/daycan.env
fi

# systemd 유닛 설치/갱신
cat >/etc/systemd/system/daycan.service <<'UNIT'
[Unit]
Description=Daycan Spring Boot Service
After=network.target

[Service]
Type=simple
User=daycan
Group=daycan
WorkingDirectory=/opt/daycan/app

# 오직 /etc/daycan/daycan.env 만 읽기 (형식 보장)
EnvironmentFile=/etc/daycan/daycan.env

# ExecStart 재정의: JVM 옵션을 토큰 단위로 전달
ExecStart=/bin/bash -lc '/usr/bin/java \
  $JAVA_XMS $JAVA_XMX $JAVA_GC $JAVA_OOM $JAVA_HEAPDUMP $JAVA_GCLOG \
  -jar /opt/daycan/app/app.jar \
  --server.port=$DAYCAN_PORT \
  --spring.profiles.active=$SPRING_PROFILES_ACTIVE'


Restart=on-failure
RestartSec=5
LimitNOFILE=65535
SuccessExitStatus=143
SyslogIdentifier=daycan
KillSignal=SIGTERM
TimeoutStopSec=30s
OOMScoreAdjust=300
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=full
ProtectHome=true
ReadWritePaths=/var/log/daycan /opt/daycan

[Install]
WantedBy=multi-user.target
UNIT

# drop-in에 예전 override 남아 있으면 충돌나니 제거(원하면 유지해도 되지만 내용 정합성 보장 필요)
rm -f /etc/systemd/system/daycan.service.d/override.conf || true
rmdir /etc/systemd/system/daycan.service.d 2>/dev/null || true

# systemd 반영
systemctl daemon-reload
systemctl enable daycan || true
systemctl restart daycan