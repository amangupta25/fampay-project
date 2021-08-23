const logger = require('../config/logger');
const services = require('./../services/index')
const {fetchYoutubeData} = require('./cron')
module.exports = {
    fetchAndStore () {
        fetchYoutubeData().then(videos => {
            if( videos && videos.length){
                services.insertVideos(videos)
                    .then((row) => {
                        logger.info('Data stored in Db!');
                    })
                    .catch((e) =>{
                        logger.error("Error in insertVideos: " + e);
                    })
            }
        }).catch(e => logger.error(e));
    }
};
