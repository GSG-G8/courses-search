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
  addComment,
  deleteComment,
  googleLogin,
  verifyUser,
  logout,
  searchCourses,
  getCoursera,
  getFutureData,
  getUdemy,
} = require('../controllers');

router.get('/getData1', getFutureData);
router.get('/getData2', getUdemy);
router.get('/getData3', getCoursera);

router.post('/login/google', googleLogin);
router.post('/catId/courseName', searchCourses);
router.get('/:categoryId/courses', getCatcourses);
router.get('/courses/:courseId', getCourseDetails);
router.get('/topCourses', getTopRatedCourses);

router.all(['/favorite', '/favorite/:id', '/comment/:id', '/auth'], verifyUser);

router.get('/auth', (req, res) => {
  res.json(req.user);
});

router.get('/favorite', getFavorite);
router.post('/favorite/:courseId', addFavorite);
router.delete('/favorite/:courseId', deleteFavorite);
router.post('/comment/:courseId', addComment);
router.delete('/comment/:commentId', deleteComment);
router.get('/logout', logout);

router.use(clientError);
router.use(serverError);

module.exports = router;
