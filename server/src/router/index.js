const router = require('express').Router();
// const { getCoursesByCatId } = require('./course');
const {
  clientError,
  serverError,
  getCoursesByCatId,
  getCourseById,
} = require('../controllers');

router.get('/:categoryId/courses', getCoursesByCatId);
router.get('/courses/:courseId', getCourseById);

router.use(clientError);
router.use(serverError);

module.exports = router;
