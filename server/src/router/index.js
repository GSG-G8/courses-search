const router = require('express').Router();

const {
  clientError,
  serverError,
  getCoursesByCatId,
  getFavorite,
  getCoursesByCatIdName,
} = require('../controllers');

router.post('/:catId/courseName', getCoursesByCatIdName);
router.get('/:categoryId/courses', getCoursesByCatId);
router.get('/favorite/:userId', getFavorite);
router.use(clientError);
router.use(serverError);

module.exports = router;
