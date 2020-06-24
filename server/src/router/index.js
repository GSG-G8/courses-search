const router = require('express').Router();

const {
  clientError,
  serverError,
  getCoursesByCatId,
  getCourseDetails,
  getFavorite,
  addFavorite,
  deleteFavorite,
} = require('../controllers');

router.get('/:categoryId/courses', getCoursesByCatId);
router.get('/courses/:courseId', getCourseDetails);
router.get('/:categoryId/courses', getCoursesByCatId);
router.get('/favorite/:userId', getFavorite);
router.get('/favorite/add/:courseId', addFavorite);
router.get('/favorite/delete/:courseId', deleteFavorite);

router.use(clientError);
router.use(serverError);

module.exports = router;
