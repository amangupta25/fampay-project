const config = require("../config");
const logger = require("../config/logger");
const utils = require("./../utils");

var apiKeyIndex = 0;
module.exports = {
    async fetchYoutubeData(){
        let apiKeys = config.youtube.api.key;
        try {
            const data = await utils.fetchLatestYoutubeVideos(apiKeys[apiKeyIndex]);
            logger.info("Videos Fetched Successfully!");
            return data.items.map(item => {
                return {
                    id: item.id.videoId,
                    title: item.snippet.title,
                    description: item.snippet.description,
                    pub_datetime: item.snippet.publishedAt,
                    thumbnail: item.snippet.thumbnails.default.url
                };
            });
        } catch (e) {
            if(e.response && e.response.status === 403) {
                logger.error(`Quata for key: ${apiKeys[apiKeyIndex]} is exhausted!`);
                apiKeyIndex = (apiKeyIndex + 1) % apiKeys.length;
                logger.info(`Trying with new key: ${apiKeys[apiKeyIndex]}`);
            }
        }
    }
}