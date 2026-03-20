const appPort = process.env.DEPLOY_APP_PORT || process.env.PORT || 3000;

module.exports = {
  apps: [
    {
      name: "kiract",
      script: "node_modules/next/dist/bin/next",
      args: ["start", "-p", String(appPort)],
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        PORT: String(appPort),
      },
    },
  ],
};
