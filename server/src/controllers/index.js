const { getCoursesByCatId } = require('./middleware/getCatcourses');

const { clientError, serverError } = require('./errorHandle');
const { getCourseDetails } = require('./middleware/getCourseDetails');
const getCoursera = require('./coursera/getCourses');
const getFavorite = require('./middleware/getFavorite');
const googleLogin = require('./googleLogin');
const verifyUser = require('./verifyUser');

module.exports = {
  clientError,
  serverError,
  getCourseDetails,
  getCoursesByCatId,
  getCoursera,
  getFavorite,
  googleLogin,
  verifyUser,
};
