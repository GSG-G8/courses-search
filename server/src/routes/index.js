const router = require('express').Router();
const { getFavorite } = require('../controllers');

router.get('/favorite/:userId', getFavorite);

module.exports = router;
