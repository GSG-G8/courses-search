const {
  getCatcourses,
  getCourseDetails,
  getTopRatedCourses,
  searchCourses,
} = require('./middleware');

const { clientError, serverError } = require('./errorHandle');
const getCoursera = require('./coursera/getCourses');
const getFavorite = require('./getFavorite');
const addFavorite = require('./favorite/add');
const deleteFavorite = require('./favorite/delete');
const googleLogin = require('./googleLogin');
const verifyUser = require('./verifyUser');
const logout = require('./logout');

module.exports = {
  clientError,
  serverError,
  getTopRatedCourses,
  getCourseDetails,
  getCatcourses,
  getCoursera,
  getFavorite,
  addFavorite,
  deleteFavorite,
  googleLogin,
  verifyUser,
  logout,
  searchCourses,
};
