# Deployment (Self-Hosted)

This project includes a simple SSH-based deployment script at `scripts/deploy.sh` that:
- connects to your server,
- fetches the latest code,
- installs dependencies,
- builds the app, and
- restarts the PM2 process.

## Prerequisites

On your **local machine**:
- Git + SSH access to the server
- Node.js + npm

On your **server**:
- Git
- Node.js + npm
- PM2 (`npm install -g pm2`)

## Configure Local Deploy Variables

Create a `.deploy.env` in the repo root (or export these variables in your shell):

| Variable | Required | Description |
| --- | --- | --- |
| `DEPLOY_HOST` | Yes | Server host (IP or domain) |
| `DEPLOY_USER` | Yes | SSH user |
| `DEPLOY_PATH` | Yes | Absolute path to the repo on the server |
| `DEPLOY_BRANCH` | Yes | Git branch to deploy |
| `DEPLOY_PORT` | No | SSH port (default: `22`) |
| `DEPLOY_SSH_CONFIG` | No | Path to an SSH config file |
| `DEPLOY_IDENTITY_FILE` | No | Path to a private key |
| `DEPLOY_REMOTE_ENV_FILE` | No | Remote env file (default: `.env.production`) |
| `DEPLOY_DB_PRECHECK` | No | `true`/`false` to enable DB reachability check (default: `true`) |
| `DEPLOY_APP_PORT` | No | App port passed to PM2 (overrides `PORT`) |

## Server Bootstrap (First Time)

1. Clone the repo to the server path:

```bash
git clone git@github.com:<org-or-user>/kiract.git /var/www/kiract
```

2. Create the remote environment file (default: `.env.production`) in the repo directory. Example values:

```bash
NODE_ENV=production
# If your app uses a DB, set DATABASE_URL
# DATABASE_URL=postgres://...
# Optional port override
# PORT=3001
```

3. Ensure PM2 is available on the server:

```bash
npm install -g pm2
```

## Deploy

From your local machine:

```bash
./scripts/deploy.sh
```

The script will:
- check for required tools,
- optionally check DB reachability when `DATABASE_URL` is set,
- update the server repo to the latest branch commit,
- build the app, and
- reload or start the `kiract` PM2 process.

## Verify

On the server:

```bash
pm2 status kiract
pm2 logs kiract --lines 100
```

If you set a custom port, confirm the app is listening on it.

## Notes

- The DB precheck runs only when `DEPLOY_DB_PRECHECK=true` **and** `DATABASE_URL` is set.
- To override the runtime port, set `DEPLOY_APP_PORT` in `.deploy.env` or `PORT` in `.env.production`.
