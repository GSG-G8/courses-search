const router = require('express').Router();

const {
  clientError,
  serverError,
  getTopRatedCourses,
  getCatcourses,
  getCourseDetails,
  getFavorite,
  googleLogin,
  verifyUser,
  logout,
  searchCourses,
} = require('../controllers');

router.post('/login/google', googleLogin);
router.post('/catId/courseName', searchCourses);
router.get('/:categoryId/courses', getCatcourses);
router.get('/courses/:courseId', getCourseDetails);
router.get('/topCourses', getTopRatedCourses);

router.all(['/favorite', '/auth'], verifyUser);

router.get('/auth', (req, res) => {
  res.json(req.user);
});

router.get('/favorite', getFavorite);
router.get('/logout', logout);

router.use(clientError);
router.use(serverError);

module.exports = router;
