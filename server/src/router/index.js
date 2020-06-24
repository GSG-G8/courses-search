const router = require('express').Router();

const {
  clientError,
  serverError,
  getTopRatedCourses,
  getCoursesByCatId,
  getCourseDetails,
  getFavorite,
  getCoursesByCatIdName,
} = require('../controllers');

router.post('/catId/courseName', getCoursesByCatIdName);
router.get('/topCourses', getTopRatedCourses);
router.get('/:categoryId/courses', getCoursesByCatId);
router.get('/courses/:courseId', getCourseDetails);
router.get('/favorite/:userId', getFavorite);
router.use(clientError);
router.use(serverError);

module.exports = router;
