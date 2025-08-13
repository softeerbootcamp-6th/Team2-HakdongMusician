#!/bin/bash
set -euo pipefail

# 디렉터리 준비
mkdir -p /opt/daycan/app /opt/daycan/scripts /opt/daycan/logs /etc/daycan

# 런타임 유저 생성(이미 있으면 통과)
id -u daycan &>/dev/null || useradd --system --create-home --shell /sbin/nologin daycan

chown -R daycan:daycan /opt/daycan /var/log/daycan
chmod -R 755 /opt/daycan/scripts

command -v java >/dev/null 2>&1 || yum install -y java-17-amazon-corretto-headless || true


# 기존 서비스가 돌고 있으면 정지 (실패 무시)
systemctl stop daycan 2>/dev/null || true
