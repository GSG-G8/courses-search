const {
  getCatcourses,
  getCourseDetails,
  getTopRatedCourses,
  searchCourses,
} = require('./middleware');

const {
  addFavoriteFolder,
  updateCourseToFolder,
  editFavoriteFolder,
  deleteFavoriteFolder,
  removeCourseFromFolder,
  getFavoriteFolder,
} = require('./favoriteFolder');

const { clientError, serverError } = require('./errorHandle');
const getCoursera = require('./coursera/getCourses');
const getFutureData = require('./scraping/index');
const getUdemy = require('./getUdemyData/index');
const getFavorite = require('./getFavorite');
const addFavorite = require('./favorite/add');
const deleteFavorite = require('./favorite/delete');
const addComment = require('./comment/add');
const deleteComment = require('./comment/delete');
const googleLogin = require('./googleLogin');
const verifyUser = require('./verifyUser');
const logout = require('./logout');
// const getUdemy =require('./getUdemyData')

module.exports = {
  clientError,
  serverError,
  getTopRatedCourses,
  getCourseDetails,
  getCatcourses,
  getCoursera,
  getFutureData,
  getUdemy,
  getFavorite,
  addFavorite,
  deleteFavorite,
  addComment,
  deleteComment,
  googleLogin,
  verifyUser,
  logout,
  searchCourses,
  addFavoriteFolder,
  updateCourseToFolder,
  editFavoriteFolder,
  deleteFavoriteFolder,
  removeCourseFromFolder,
  getFavoriteFolder,
};
