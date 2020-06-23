const { getCoursesByCatId } = require('./middleware/getCatcourses');

const { clientError, serverError } = require('./errorHandle');
const getCoursera = require('./coursera/getCourses');
const getFavorite = require('./middleware/getFavorite');
const googleLogin = require('./googleLogin');
const verifyUser = require('./verifyUser');

module.exports = {
  clientError,
  serverError,
  getCoursesByCatId,
  getCoursera,
  getFavorite,
  googleLogin,
  verifyUser,
};
