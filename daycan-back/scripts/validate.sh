#!/usr/bin/env bash
set -euo pipefail

echo "🔍 Starting service validation..."

# 0) env 로드 (/etc 고정 + /opt 번들 둘 다)
set -a
[ -f /etc/daycan/daycan.env ] && . /etc/daycan/daycan.env
[ -f /opt/daycan/daycan.env ] && . /opt/daycan/daycan.env
set +a

PORT="${DAYCAN_PORT:-8080}"
HEALTH_PATH="${HEALTH_PATH:-/actuator/health}"
BASE_URL="http://127.0.0.1:${PORT}"
HEALTH_URL="${BASE_URL}${HEALTH_PATH}"

TRIES="${TRIES:-60}"         # 총 대기 (기본 60회 x 2초 = 120초)
SLEEP_SEC="${SLEEP_SEC:-2}"

echo "PORT=${PORT}, PROFILE=${SPRING_PROFILES_ACTIVE:-unknown}, HEALTH=${HEALTH_URL}"

ok_http=false
ok_systemd=false

for i in $(seq 1 "$TRIES"); do
  echo "[$i/${TRIES}] Checking..."

  # 1) systemd 상태
  if systemctl is-active --quiet daycan; then
    ok_systemd=true
    echo "  ✅ systemd: active"
  else
    ok_systemd=false
    echo "  ⏳ systemd: not active yet"
  fi

  # 2) 포트 리슨 여부 (디버깅용)
  if ss -tlnp 2>/dev/null | grep -q ":${PORT} "; then
    echo "  ✅ port ${PORT}: LISTEN"
  else
    echo "  ⏳ port ${PORT}: not listening"
  fi

  # 3) HTTP 헬스 (200 판단)
  if curl -fsS --connect-timeout 1 --max-time 2 "$HEALTH_URL" >/dev/null; then
    ok_http=true
    echo "  ✅ health: 200 OK"
  else
    ok_http=false
    echo "  ⏳ health: not ready"
  fi

  # 4) 성공 조건: 둘 다 true
  if $ok_systemd && $ok_http; then
    echo "🎉 Service validation SUCCESS"
    exit 0
  fi

  sleep "$SLEEP_SEC"
done

echo "❌ Health check FAILED after $TRIES attempts"

echo "---- systemd status ----"
systemctl status daycan --no-pager || true

echo "---- recent logs ----"
journalctl -u daycan -n 100 --no-pager || true

echo "---- listening sockets ----"
ss -tlnp | egrep ":${PORT}|:80|:443" || true

exit 1
