
module.exports = {
  apps: [{
    name: 'educ-portal',
    script: 'npm',
    args: 'run preview',
    cwd: './dist',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 4173
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 4173
    }
  }]
};
