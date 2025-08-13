#!/bin/bash
set -euo pipefail

echo "🔍 Starting service validation..."

PORT="${DAYCAN_PORT:-8080}"
BASE_URL="http://127.0.0.1:${PORT}"


# 30번 시도 (총 60초 대기)
for i in {1..30}; do
  echo "[$i/30] Checking service health..."

  # 엔드포인트 응답 확인
  if curl -fsS "$BASE_URL" > /dev/null 2>&1; then
    echo "✅ Main application endpoint responding!"
  else
    echo "⚠️  Main endpoint not responding"
  fi

  # systemd 서비스 상태 확인
  if systemctl is-active --quiet daycan; then
    echo "✅ Systemd service is active"
    echo "🎉 Service validation completed successfully!"
    exit 0
  else
    echo "⚠️  Systemd service is NOT active yet"
  fi

  echo "⏳ Waiting for app... (${i}/30)"
  sleep 2
done

# 실패 시
echo "❌ Health check FAILED after 30 attempts!"
echo "Service logs:"
journalctl -u daycan --no-pager -n 10 || true
exit 1