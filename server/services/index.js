// // Import Sequelize model
const { Videos } = require('../db/models/index');

module.exports = {
    async getAllVideos(limit,offset,condition,order,direction) {

        const videos = await Videos.findAndCountAll({ where: condition, limit, offset, order: [[order, direction]] });
        return videos;
    },
    async insertVideos(video){
        const insertedVideos = await Videos.bulkCreate(video, { returning: true, ignoreDuplicates: true });
        return insertedVideos;
    },

};
