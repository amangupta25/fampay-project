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
const helper = require('./server/utils/helper')

// Fetching Videos from Youtube Data v3 API in intervals and Storing in Db
helper.fetchAndStore();
setInterval(function(){
    helper.fetchAndStore();
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
            .catch(err => logger.error('Unable to connect to the database: ' +  err))
    })

module.exports = app;
