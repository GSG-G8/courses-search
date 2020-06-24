const {
  getCatcourses,
  getCourseDetails,
  getTopRatedCourses,
  searchCourses,
} = require('./middleware');

const { clientError, serverError } = require('./errorHandle');
const getCoursera = require('./coursera/getCourses');
const getFavorite = require('./getFavorite');
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
  googleLogin,
  verifyUser,
  logout,
  searchCourses,
};
