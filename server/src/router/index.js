const router = require('express').Router();

const {
  clientError,
  serverError,
  getCoursesByCatId,
  getCourseDetails,
  getFavorite,
} = require('../controllers');

router.get('/:categoryId/courses', getCoursesByCatId);
router.get('/courses/:courseId', getCourseDetails);
router.get('/:categoryId/courses', getCoursesByCatId);
router.get('/favorite/:userId', getFavorite);
router.use(clientError);
router.use(serverError);

module.exports = router;
