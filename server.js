const bodyParser = require('body-parser');
const express = require('express');
const api = require('./server/api');
const config = require("./server/config");
const { sequelize } = require('./server/db/models');
const path = require("path");
const serveFavicon = require("serve-favicon");
const serveStatic = require("serve-static");
const expressPino = require('express-pino-logger');
const logger = require('./server/config/logger');
const expressLogger = expressPino({ logger });
const utils = require('./server/utils/index');
const services = require('./server/services/index');


var apiKeyIndex = 0;
async function fetchYoutubeData(){
    let apiKeys = config.youtube.api.key;
    try {
        const data = await utils.fetchLatestYoutubeVideos(apiKeys[apiKeyIndex]);
        const videos = data.items.map(item => {
            return {
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                pub_datetime: item.snippet.publishedAt,
                thumbnail: item.snippet.thumbnails.default.url
            };
        });
        const resp = await services.insertVideos(videos);
    } catch (e) {
        if(e.response && e.response.status === 403)
            apiKeyIndex = (apiKeyIndex + 1) % apiKeys.length;
    }

}

fetchYoutubeData().then((resp) => logger.info("Data fetched and stored!"));
setInterval(function(){
    fetchYoutubeData().then((resp) => logger.info("Data fetched and stored!"));
}, config.youtube.fetch.interval);

/**
 * Express server initialization
 */
const app = express();

app.use(expressLogger);
/**
 * Application configuration
 */
app.use(bodyParser.json());

/**
 * API routes
 */
app.use('/api', api);

/**
 * Base route
 */
// app.get('/', (req, res) => res.redirect('/docs'));

if (process.env.NODE_ENV !== "development") {
    // app.use(history());
    app.use(serveFavicon(path.join(__dirname, "static", "favicon.ico")));
    app.get("/index.html", function(req, res) {
        res
            // .cookie("XSRF-TOKEN", req.csrfToken())
            .sendFile(path.join(__dirname, "build", "index.html"));
    });
    app.use(serveStatic(path.join(__dirname, "build")));
    app.use(serveStatic(path.join(__dirname, "static")));
}

// Fallback Error Handler
app.use(function(err, req, res, next) {
    res.status(500).send();
});

/**
 * Server start
 */
app
    .listen(config.app.port, config.app.host, () => {
        console.log(`App is running at ${config.app.host}:${config.app.port} in ${process.env.NODE_ENV} mode`);
        // Verify database connection
        sequelize
            .authenticate()
            .then(() => logger.info(`Successfully connected to ${sequelize.config.database} database`))
            .catch(err => logger.error('Unable to connect to the database:' +  err))
    })

module.exports = app;
