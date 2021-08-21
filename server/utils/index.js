const axios = require("axios");
const config = require("../config");
const logger = require('../config/logger');


module.exports = {
    async fetchLatestYoutubeVideos(apiKey) {
        try {
            const res = await axios
                .get(config.youtube.api.query + apiKey)
            return res.data;
        } catch (e){
            logger.error("fetchLatestYoutubeVideos: " + e);
            throw e;
        }
    },
    getPagination (page, size) {
        const limit = size ? +size : 5;
        const offset = page ? page * limit : 0;

        return { limit, offset };
    },
    getPagingData (data, page, limit) {
        const { count: totalItems, rows: videos } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, videos, totalPages, currentPage, limit };
    }
};
