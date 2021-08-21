const { Sequelize } = require('sequelize');

const db = require('./database');

const sequelize = new Sequelize(db);

module.exports = sequelize;
