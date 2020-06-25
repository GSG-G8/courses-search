const {
  getCatcourses,
  getCourseDetails,
  getTopRatedCourses,
  searchCourses,
} = require('./middleware');

const { clientError, serverError } = require('./errorHandle');
const getCoursera = require('./coursera/getCourses');
const getFutureData = require('./scraping/index');
const getUdemy = require('./getUdemyData/index');
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
  getFutureData,
  getUdemy,
  getFavorite,
  addFavorite,
  deleteFavorite,
  googleLogin,
  verifyUser,
  logout,
  searchCourses,
};
