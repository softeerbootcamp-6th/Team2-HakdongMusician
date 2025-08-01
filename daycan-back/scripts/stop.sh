#!/bin/bash
set -euo pipefail
# 존재하면 멈추기. 실패 무시
systemctl stop daycan 2>/dev/null || true