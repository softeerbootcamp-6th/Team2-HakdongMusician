#!/bin/bash
set -euo pipefail

# 권한 정리
chown -R daycan:daycan /opt/daycan
chmod -R 755 /opt/daycan/scripts

# 환경파일(없으면 기본값만)
if [ ! -f /etc/daycan/daycan.env ]; then
  cat >/etc/daycan/daycan.env <<'EOF'
SPRING_PROFILES_ACTIVE=develop
DAYCAN_PORT=8080
JAVA_OPTS="-Xms512m -Xmx1024m"
# LOGGING_FILE_NAME=/opt/daycan/logs/app.log   # 파일 로깅 원하면 주석 해제
EOF
fi
chmod 640 /etc/daycan/daycan.env
chown root:daycan /etc/daycan/daycan.env

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
EnvironmentFile=-/etc/daycan/daycan.env
ExecStart=/usr/bin/java $JAVA_OPTS -jar /opt/daycan/app/app.jar \
  --server.port=${DAYCAN_PORT:-8080} \
  --spring.profiles.active=${SPRING_PROFILES_ACTIVE:-main}
Restart=on-failure
RestartSec=5
LimitNOFILE=65535
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
UNIT

# systemd 반영
systemctl daemon-reload