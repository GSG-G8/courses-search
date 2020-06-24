const getTopRatedCourses = require('./middleware/getTopRatedCourses');
const { getCoursesByCatId } = require('./middleware/getCatcourses');
const { getCoursesByCatIdName } = require('./middleware/searchCourses');
const { clientError, serverError } = require('./errorHandle');
const { getCourseDetails } = require('./middleware/getCourseDetails');
const getCoursera = require('./coursera/getCourses');
const getFavorite = require('./middleware/getFavorite');

module.exports = {
  clientError,
  serverError,
  getTopRatedCourses,
  getCourseDetails,
  getCoursesByCatId,
  getCoursera,
  getFavorite,
  getCoursesByCatIdName,
};
