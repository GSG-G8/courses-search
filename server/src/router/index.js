const router = require('express').Router();
const { getCoursesByCatId } = require('./course');

const { clientError, serverError } = require('../controllers');

router.get('/:categoryId/courses', getCoursesByCatId);

router.use(clientError);
router.use(serverError);

module.exports = router;
