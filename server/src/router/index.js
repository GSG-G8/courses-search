const router = require('express').Router();

const {
  clientError,
  serverError,
  getCourseDetails,
  getFavorite,
  addFavorite,
  addFavoriteFolder,
  editFavoriteFolder,
  deleteFavorite,
  addComment,
  deleteComment,
  googleLogin,
  verifyUser,
  logout,
  searchCourses,
  getFutureData,
  getUdemy,
  updateCourseToFolder,
  deleteFavoriteFolder,
  removeCourseFromFolder,
  getFavoriteFolder,
  getCoursera,
} = require('../controllers');

router.get('/getFutureData', getFutureData);
router.get('/getUdemyData', getUdemy);
router.get('/getCourseraData', getCoursera);

router.post('/login/google', googleLogin);
router.post('/catId/courseName', searchCourses);
router.get('/courses/:courseId', getCourseDetails);

router.all(
  [
    '/favorite',
    '/favorite/:courseId',
    '/comment/:commentId',
    '/comment/:courseId',
    '/favorite/folder',
    '/favorite/folder/:folderId',
    '/favorite/add-to-folder',
    '/favorite/folder/:folderId/:courseId',
    '/auth',
    '/favorite/folder',
  ],
  verifyUser
);

router.get('/auth', (req, res) => {
  res.json(req.user);
});

router.get('/favorite', getFavorite);

router
  .route('/favorite/folder')
  .get(getFavoriteFolder)
  .post(addFavoriteFolder)
  .put(editFavoriteFolder);
router.delete('/favorite/folder/:folderId', deleteFavoriteFolder);

router.post('/favorite/add-to-folder', updateCourseToFolder);
router.delete('/favorite/folder/:folderId/:courseId', removeCourseFromFolder);

router.post('/favorite/:courseId', addFavorite);
router.delete('/favorite/:courseId', deleteFavorite);
router.post('/comment/:courseId', addComment);
router.delete('/comment/:commentId', deleteComment);
router.get('/logout', logout);

router.use(clientError);
router.use(serverError);

module.exports = router;
