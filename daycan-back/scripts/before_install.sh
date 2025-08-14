#!/usr/bin/env bash
set -euo pipefail
set -x  # 로그에 실행 커맨드 남기기

RUN_USER=daycan

# 0) 런타임 유저 보장
if ! id -u "$RUN_USER" >/dev/null 2>&1; then
  useradd --system --create-home --shell /sbin/nologin "$RUN_USER"
fi

# 1) 디렉터리 보장(필요하면 둘 다)
install -d -m 0755 -o "$RUN_USER" -g "$RUN_USER" /opt/daycan/app
install -d -m 0755 -o "$RUN_USER" -g "$RUN_USER" /opt/daycan/scripts
install -d -m 0755 -o "$RUN_USER" -g "$RUN_USER" /opt/daycan/logs
install -d -m 0755 -o "$RUN_USER" -g "$RUN_USER" /etc/daycan
install -d -m 0755 -o "$RUN_USER" -g "$RUN_USER" /var/log/daycan   # ← 여기 추가

chmod -R 755 /opt/daycan/scripts || true

# 2) Java 설치 (없을 때만)
if ! command -v java >/dev/null 2>&1; then
  (command -v dnf >/dev/null 2>&1 && dnf install -y java-17-amazon-corretto-headless) \
  || yum install -y java-17-amazon-corretto-headless \
  || true
fi

# 3) 기존 서비스/프로세스 정지(실패 무시)
systemctl stop daycan 2>/dev/null || true
pkill -f 'java .*app\.jar' 2>/dev/null || true