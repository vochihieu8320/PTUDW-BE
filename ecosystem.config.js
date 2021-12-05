module.exports = {
  apps : [{
    name: "WNC",
    script: "dist/app.js",
    env: {
      PORT: 3000,
      NODE_ENV: "development",
      db : "mongodb://localhost:27017/AppChat",
      JWT_TOKEN_SECRET: "vch@11111111iiiiiiiii",
      Domain_Fe: "http://localhost:4200"
    },
    env_production: {
      PORT: 3000,
      NODE_ENV: "production",
      JWT_TOKEN_SECRET: "vch@11111111iiiiiiiii",
      db : "mongodb+srv://appchat:zK26s3auQa52Ux1I@cluster0.aw7bq.mongodb.net/AppChat?retryWrites=true&w=majority",
      db_password: "zK26s3auQa52Ux1I",
      db_username: "appchat"
    },
    error_file: 'err.log',
    out_file: 'out.log',
    log_file: 'combined.log',
    time: true
  }]
};
