const router = require('express').Router();

const { clientError, serverError } = require('../controllers');
const { getFavorite } = require('../controllers');

router.get('/favorite/:userId', getFavorite);
router.use(clientError);
router.use(serverError);

module.exports = router;
