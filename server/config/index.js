require('dotenv').config();

const config = {
  app: {
    port: process.env.SERVER_PORT ? process.env.SERVER_PORT : 7000,
    host: '0.0.0.0'
  },
  csrf: { cookie: true },
  youtube: {
    fetch: {
      interval: process.env.YOUTUBE_FETCH_INTERVAL_IN_MILLISECONDS ?
          process.env.YOUTUBE_FETCH_INTERVAL_IN_MILLISECONDS :10000 //default is 10s
    },
    api: {
      query: process.env["YOUTUBE_FETCH_API_QUERY"],
      key: process.env["YOUTUBE_FETCH_API_KEY_COMMA_SAPERATED"].split(",")
    }
  },
  db: {
      user: process.env.DB_USERNAME || 'fp',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_DATABASE || 'fp',
      password: process.env.DB_PASSWORD ||'password',
      port: process.env.DB_PORT || 5432,
    },
};

module.exports = config;
