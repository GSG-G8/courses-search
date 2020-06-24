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
  getCoursera,
} = require('../controllers');

router.post('/login/google', googleLogin);
router.post('/catId/courseName', searchCourses);
router.get('/:categoryId/courses', getCatcourses);
router.get('/courses/:courseId', getCourseDetails);
router.get('/topCourses', getTopRatedCourses);
router.get('/coursera', getCoursera);

router.all(
  [
    '/favorite',
    '/favorite/add/:courseId',
    '/favorite/delete/:courseId',
    '/auth',
  ],
  verifyUser
);

router.get('/auth', (req, res) => {
  res.json(req.user);
});

router.get('/favorite', getFavorite);
router.post('/favorite/add/:courseId', addFavorite);
router.delete('/favorite/delete/:courseId', deleteFavorite);
router.get('/logout', logout);

router.use(clientError);
router.use(serverError);

module.exports = router;
