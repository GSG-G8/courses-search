const router = require('express').Router();

const {
  clientError,
  serverError,
  getTopRatedCourses,
  getCatcourses,
  getCourseDetails,
  getFavorite,
  addFavorite,
  addFavoriteFolder,
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
  updateCourseToFolder,
} = require('../controllers');

router.get('/getData1', getFutureData);
router.get('/getData2', getUdemy);
router.get('/getData3', getCoursera);

router.post('/login/google', googleLogin);
router.post('/catId/courseName', searchCourses);
router.get('/:categoryId/courses', getCatcourses);
router.get('/courses/:courseId', getCourseDetails);
router.get('/topCourses', getTopRatedCourses);

router.all(
  [
    '/favorite',
    '/favorite/:courseId',
    '/comment/:commentId',
    '/comment/:courseId',
    '/auth',
  ],
  verifyUser
);

router.get('/auth', (req, res) => {
  res.json(req.user);
});

router.get('/favorite', getFavorite);
router.post('/favorite/add-folder', addFavoriteFolder);
router.post('/favorite/add-to-folder', updateCourseToFolder);
router.post('/favorite/:courseId', addFavorite);
router.delete('/favorite/:courseId', deleteFavorite);
router.post('/comment/:courseId', addComment);
router.delete('/comment/:commentId', deleteComment);
router.get('/logout', logout);

router.use(clientError);
router.use(serverError);

module.exports = router;
