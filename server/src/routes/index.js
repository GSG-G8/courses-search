const router = require('express').Router();
const getTopRatedCourses = require('../controllers');

router.get('/courses', getTopRatedCourses);

module.exports = router;
