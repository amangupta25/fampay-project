const services = require('../../services/index');
const { Op } = require("sequelize");
const { getPagination,getPagingData } = require('../../utils/index');

module.exports = {
    async getAllStoredVideos(req, res, next) {
        try {
            const { page, size, title, description, orderBy, direction } = req.query;
            var condition = {};
            if(title)
                condition.title = { [Op.iLike]: `%${title}%` };
            if(description)
                condition.description = { [Op.iLike]: `%${description}%` };
            if(!(title || description))
                condition = null;
            const order = orderBy ? orderBy : "pub_datetime";
            const orderDirection = direction ? direction : "DESC";
            const { limit, offset } = getPagination(page, size);
            const videos = await services.getAllVideos(limit,offset,condition,order,orderDirection);
            const response = getPagingData(videos, page, limit);
            return res.status(200).json({ response });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    },
};
