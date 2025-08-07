#!/bin/bash
set -euo pipefail

# 권한 정리
chown -R daycan:daycan /opt/daycan
chmod -R 755 /opt/daycan/scripts

cp /opt/daycan/daycan.env /etc/daycan/daycan.env
chmod 640 /etc/daycan/daycan.env
chown root:daycan /etc/daycan/daycan.env

# systemd 유닛 설치/갱신
cat >/etc/systemd/system/daycan.service <<UNIT
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