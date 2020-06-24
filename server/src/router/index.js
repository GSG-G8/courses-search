const router = require('express').Router();
const { sign } = require('jsonwebtoken');

const {
  clientError,
  serverError,
  getTopRatedCourses,
  getCoursesByCatId,
  getCourseDetails,
  getFavorite,
  googleLogin,
  verifyUser,
  logout,
} = require('../controllers');

router.post('/login/google', googleLogin);
router.get('/:categoryId/courses', getCoursesByCatId);
router.get('/courses/:courseId', getCourseDetails);
router.get('/topCourses', getTopRatedCourses);

router.use(verifyUser);

router.get('/auth', (req, res) => {
  res.json(req.user);
});

router.get('/favorite', getFavorite);
router.get('/logout', logout);

router.use(clientError);
router.use(serverError);

module.exports = router;
