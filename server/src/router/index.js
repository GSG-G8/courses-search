const router = require('express').Router();

const {
  clientError,
  serverError,
  getTopRatedCourses,
  getCatcourses,
  getCourseDetails,
  getFavorite,
  addFavorite,
  deleteFavorite,
  googleLogin,
  verifyUser,
  logout,
  searchCourses,
} = require('../controllers');

router.post('/login/google', googleLogin);
router.post('/catId/courseName', searchCourses);
router.get('/topCourses', getTopRatedCourses);
router.get('/:categoryId/courses', getCatcourses);
router.get('/courses/:courseId', getCourseDetails);
router.get('/topCourses', getTopRatedCourses);

router.use(verifyUser);

router.get('/auth', (req, res) => {
  res.json(req.user);
});

router.get('/favorite', getFavorite);
router.get('/favorite/add/:courseId', addFavorite);
router.get('/favorite/delete/:courseId', deleteFavorite);
router.get('/logout', logout);

router.use(clientError);
router.use(serverError);

module.exports = router;
