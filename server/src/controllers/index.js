const { getCoursesByCatId } = require('./middleware/getCatcourses');

const { clientError, serverError } = require('./errorHandle');
const { getCourseDetails } = require('./middleware/getCourseDetails');
const getCoursera = require('./coursera/getCourses');
const getFavorite = require('./getFavorite');
const googleLogin = require('./googleLogin');
const verifyUser = require('./verifyUser');
const logout = require('./logout');

module.exports = {
  clientError,
  serverError,
  getCourseDetails,
  getCoursesByCatId,
  getCoursera,
  getFavorite,
  googleLogin,
  verifyUser,
  logout,
};
