#!/usr/bin/env bash
set -uo pipefail
paths=("/" "/cursor-pricing" "/india" "/mcp" "/mcp/servers" "/models" "/agents" "/best-ai-agent-for-coding" "/best-ai-agent-for-real-estate-calls" "/ai-agent-tools")
failed=0
for p in "${paths[@]}"; do
  headers=$(curl --silent --show-error --head --max-time 15 "https://www.bestaiagent.in${p}" 2>/dev/null) || { echo "FAIL ${p} (network or TLS)"; failed=1; continue; }
  status=$(printf '%s\n' "$headers" | awk 'toupper($1) ~ /^HTTP/ {code=$2} END {print code}')
  location=$(printf '%s\n' "$headers" | awk -F': ' 'tolower($1)=="location" {print $2}' | tr -d '\r' | tail -1)
  expected="https://bestaiagent.in${p}"
  if [[ "$status" == "301" && "$location" == "$expected" ]]; then
    echo "PASS ${p} → ${location}"
  else
    echo "FAIL ${p} status=${status:-unknown} location=${location:-missing} expected=${expected}"
    failed=1
  fi
done
# Query preservation is a separate required edge rule assertion.
queryHeaders=$(curl --silent --show-error --head --max-time 15 "https://www.bestaiagent.in/cursor-pricing?audit=canonical" 2>/dev/null) || queryHeaders=""
queryStatus=$(printf '%s\n' "$queryHeaders" | awk 'toupper($1) ~ /^HTTP/ {code=$2} END {print code}')
queryLocation=$(printf '%s\n' "$queryHeaders" | awk -F': ' 'tolower($1)=="location" {print $2}' | tr -d '\r' | tail -1)
if [[ "$queryStatus" == "301" && "$queryLocation" == "https://bestaiagent.in/cursor-pricing?audit=canonical" ]]; then
 echo "PASS query preservation"
else
 echo "FAIL query preservation status=${queryStatus:-unknown} location=${queryLocation:-missing}"
 failed=1
fi
exit "$failed"
