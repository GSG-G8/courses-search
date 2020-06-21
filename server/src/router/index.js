const router = require('express').Router();

const { clientError, serverError, getCourseById } = require('../controllers');

router.get('/courses/:courseId', getCourseById);
router.use(clientError);
router.use(serverError);

module.exports = router;
