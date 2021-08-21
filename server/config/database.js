const config = require('./index');
const { db } = config;

// Sequelize options
const options = {
  dialect: 'postgres',
  define: {
    charset: 'utf-8',
  },
  logging: console.log,
};

module.exports = {
    ...options,
    host: db.host,
    port: db.port,
    username: db.user,
    password: db.password,
    database: db.database,
};
