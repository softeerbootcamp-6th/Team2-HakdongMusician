#!/bin/bash
set -euo pipefail

# 서비스 활성화 및 재시작(없으면 start)
systemctl enable daycan
if systemctl is-active --quiet daycan; then
  systemctl restart daycan
else
  systemctl start daycan
fi