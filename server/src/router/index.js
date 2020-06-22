const router = require('express').Router();

const {
  clientError,
  serverError,
  getCoursesByCatId,
} = require('../controllers');

router.get('/:categoryId/courses', getCoursesByCatId);

router.use(clientError);
router.use(serverError);

module.exports = router;
