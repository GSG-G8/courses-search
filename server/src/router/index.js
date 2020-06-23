const router = require('express').Router();

const {
  clientError,
  serverError,
  getTopRatedCourses,
  getFavorite,
  getCoursesByCatId,
} = require('../controllers');


router.get('/courses', getTopRatedCourses);
router.get('/:categoryId/courses', getCoursesByCatId);
router.get('/favorite/:userId', getFavorite);
router.use(clientError);
router.use(serverError);

module.exports = router;
