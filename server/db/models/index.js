const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const DataTypes = require('sequelize/lib/data-types');
const logger = require('../../config/logger')
// Import models
const models = {};

// Import Model -> Example
models.Videos = require('./videos')(sequelize, DataTypes);
if(process.env.NODE_ENV !== "development"){
    sequelize.sync({force: true, match: /fp$/ })
        .then(() => {
            logger.info(`Database & tables created!`)
        })
        .catch((e) =>{
            logger.error(`Unable to sync the database: `+ e)
        })
}

module.exports = { ...models, sequelize, Sequelize };
