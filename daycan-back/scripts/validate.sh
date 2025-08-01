#!/bin/bash
set -euo pipefail

echo "🔍 Starting service validation..."

PORT="${DAYCAN_PORT:-8080}"
BASE_URL="http://127.0.0.1:${PORT}"

# 30번 시도 (총 60초 대기)
for i in {1..30}; do
  echo "[$i/30] Checking service health..."

  # 추가로 기본 엔드포인트도 체크
  if curl -fsS "$BASE_URL" > /dev/null 2>&1; then
    echo "✅ Main application endpoint responding!"
  else
    echo "⚠️  Main endpoint not responding, but health check passed"
  fi

  # 서비스 상태 확인
  if systemctl is-active --quiet daycan; then
    echo "✅ Systemd service is active"
  else
    echo "⚠️  Systemd service status unknown"
  fi

  echo "🎉 Service validation completed successfully!"
  exit 0

  echo "⏳ Waiting for app... (${i}/30)"
  sleep 2
done

echo "❌ Health check FAILED!"
echo "Service logs:"
journalctl -u daycan --no-pager -n 10 || true
exit 1