#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEPLOY_ENV_FILE="${DEPLOY_ENV_FILE:-$ROOT_DIR/.deploy.env}"

if [[ -f "$DEPLOY_ENV_FILE" ]]; then
  # shellcheck disable=SC1090
  source "$DEPLOY_ENV_FILE"
fi

required_vars=(
  DEPLOY_HOST
  DEPLOY_USER
  DEPLOY_PATH
  DEPLOY_BRANCH
)

for var_name in "${required_vars[@]}"; do
  if [[ -z "${!var_name:-}" ]]; then
    echo "Missing required variable: $var_name"
    echo "Set it in $DEPLOY_ENV_FILE or in your shell environment."
    exit 1
  fi
done

DEPLOY_PORT="${DEPLOY_PORT:-22}"
DEPLOY_REF="origin/$DEPLOY_BRANCH"
DEPLOY_SSH_TARGET="${DEPLOY_SSH_TARGET:-$DEPLOY_USER@$DEPLOY_HOST}"
DEPLOY_REMOTE_ENV_FILE="${DEPLOY_REMOTE_ENV_FILE:-.env.production}"
DEPLOY_DB_PRECHECK="${DEPLOY_DB_PRECHECK:-true}"
DEPLOY_APP_PORT="${DEPLOY_APP_PORT:-}"

read -r -d '' REMOTE_SCRIPT <<'EOF' || true
set -euo pipefail

echo "[deploy] Path: $DEPLOY_PATH"
echo "[deploy] Branch: $DEPLOY_BRANCH"

if [[ ! -d "$DEPLOY_PATH/.git" ]]; then
  if [[ "$DEPLOY_PATH" == /home/root/* ]]; then
    ALT_PATH="/root/${DEPLOY_PATH#/home/root/}"
    if [[ -d "$ALT_PATH/.git" ]]; then
      echo "[deploy] Path not found at $DEPLOY_PATH, using $ALT_PATH instead"
      DEPLOY_PATH="$ALT_PATH"
    fi
  fi
fi

if [[ ! -d "$DEPLOY_PATH/.git" ]]; then
  echo "Repository not found at $DEPLOY_PATH"
  echo "Create it first, for example:"
  echo "  git clone git@github.com:<org-or-user>/kiract.git $DEPLOY_PATH"
  exit 1
fi

cd "$DEPLOY_PATH"

echo "[deploy] Predeploy checks"
for required_cmd in git npm node pm2; do
  if ! command -v "$required_cmd" >/dev/null 2>&1; then
    echo "Missing required command on server: $required_cmd"
    exit 1
  fi
done

if [[ -n "$DEPLOY_REMOTE_ENV_FILE" && -f "$DEPLOY_REMOTE_ENV_FILE" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "$DEPLOY_REMOTE_ENV_FILE"
  set +a
fi

if [[ "$DEPLOY_DB_PRECHECK" == "true" ]]; then
  if [[ -z "${DATABASE_URL:-}" ]]; then
    echo "[deploy] Skipping DB precheck: DATABASE_URL is empty."
  else
    if ! node -e '
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  process.exit(2);
}
const { URL } = require("url");
const net = require("net");
const parsed = new URL(databaseUrl);
const host = parsed.hostname;
const port = Number(parsed.port || 5432);
const socket = net.createConnection({ host, port, timeout: 3000 });
socket.on("connect", () => {
  socket.destroy();
  process.exit(0);
});
socket.on("timeout", () => {
  socket.destroy();
  process.exit(3);
});
socket.on("error", () => {
  process.exit(4);
});
'; then
      echo "Predeploy check failed: cannot reach PostgreSQL host/port from DATABASE_URL."
      echo "Check DATABASE_URL/DATABASE_SSL and server firewall/network settings."
      exit 1
    fi

    echo "[deploy] Database reachability check passed"
  fi
fi

echo "[deploy] Fetching latest code"
git fetch --prune origin
git checkout -B "$DEPLOY_BRANCH" "$DEPLOY_REF"
git reset --hard "$DEPLOY_REF"

echo "[deploy] Installing dependencies"
npm ci

echo "[deploy] Building application"
npm run build

echo "[deploy] Restarting PM2 process"
if pm2 describe kiract >/dev/null 2>&1; then
  pm2 reload ecosystem.config.cjs --only kiract --update-env
else
  pm2 start ecosystem.config.cjs --only kiract --update-env
fi

pm2 save
pm2 status kiract
EOF

echo "[deploy] Executing on $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PORT"

SSH_OPTIONS=(
  -p "$DEPLOY_PORT"
  -o BatchMode=yes
  -o PreferredAuthentications=publickey
  -o PasswordAuthentication=no
)

if [[ -n "${DEPLOY_SSH_CONFIG:-}" ]]; then
  SSH_OPTIONS+=( -F "$DEPLOY_SSH_CONFIG" )
fi

if [[ -n "${DEPLOY_IDENTITY_FILE:-}" ]]; then
  SSH_OPTIONS+=( -i "$DEPLOY_IDENTITY_FILE" )
fi

echo "[deploy] Executing on $DEPLOY_SSH_TARGET"

ssh "${SSH_OPTIONS[@]}" "$DEPLOY_SSH_TARGET" \
  "DEPLOY_PATH='$DEPLOY_PATH' DEPLOY_BRANCH='$DEPLOY_BRANCH' DEPLOY_REF='$DEPLOY_REF' DEPLOY_REMOTE_ENV_FILE='$DEPLOY_REMOTE_ENV_FILE' DEPLOY_DB_PRECHECK='$DEPLOY_DB_PRECHECK' DEPLOY_APP_PORT='$DEPLOY_APP_PORT' bash -s" <<<"$REMOTE_SCRIPT"

echo "[deploy] Complete"
