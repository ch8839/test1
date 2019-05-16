module.exports = {
  apps : [{
    name: '土壤监测',
    script: '/server/app.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 4,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PM2_SERVE_PORT: 9097
    },
    env_production: {
      NODE_ENV: 'production',
      PM2_SERVE_PORT: 9098
    }
  }]
};
