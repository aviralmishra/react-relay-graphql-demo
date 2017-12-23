module.exports = {
  apps: [
    {
      name: 'appDev',
      script: 'lib/server.js',
      watch: true,
      ignore_watch: 'lib/data/schema.json',
      interpreter: 'babel-node',
      env_development: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],
  deploy: {
    development: {
      user: 'node',
      host: '127.0.0.1',
      ref: 'origin/master',
      repo: 'git+https://github.com/aviralmishra/react-flux-graphql-demo.git',
      path: '/var/www/development',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env dev',
      env: {
        NODE_ENV: 'dev'
      }
    },
    production: {
      user: 'node',
      host: '127.0.0.1',
      ref: 'origin/master',
      repo: 'git+https://github.com/aviralmishra/react-flux-graphql-demo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      script: 'build/server.js',
      name: 'appProd',
      i: 'max'
    }
  }
};
