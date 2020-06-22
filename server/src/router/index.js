const router = require('express').Router();

const { clientError, serverError } = require('../controllers');
const { getTopRatedCourses } = require('../controllers');

router.get('/courses', getTopRatedCourses);
router.use(clientError);
router.use(serverError);

module.exports = router;
