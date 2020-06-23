const router = require('express').Router();

const {
  clientError,
  serverError,
  getTopRatedCourses,
  getFavorite,
} = require('../controllers');

router.get('/courses', getTopRatedCourses);
router.get('/favorite/:userId', getFavorite);
router.use(clientError);
router.use(serverError);

module.exports = router;
