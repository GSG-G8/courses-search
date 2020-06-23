const router = require('express').Router();

const {
  clientError,
  serverError,
  getCoursesByCatId,
  getCourseDetails,
  getFavorite,
  googleLogin,
  verifyUser,
} = require('../controllers');

router.get('/:categoryId/courses', getCoursesByCatId);
router.get('/courses/:courseId', getCourseDetails);
router.get('/:categoryId/courses', getCoursesByCatId);
router.get('/favorite/:userId', getFavorite);
router.post('/login/google', googleLogin);
router.use(verifyUser);

router.get('/auth', (req, res) => {
  res.json(req.user);
});

router.use(clientError);
router.use(serverError);

module.exports = router;
