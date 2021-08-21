const { Router } = require('express');
const { NotFound } = require('http-errors');
const controllers = require('./controllers/index')

const router = Router();

/**
 * Router configuration
 */

/**
 * API routes
 */
router.get('/all',controllers.getAllStoredVideos);

router.get('/', (req, res) => res.sendStatus(200));

/**
 * 404 error handling
 */
router.use((req, res, next) => {
  const { baseUrl, url, method } = req;

  next(new NotFound(`The route '${method} ${baseUrl}${url}' doesn't exist.`));
});

module.exports = router;
