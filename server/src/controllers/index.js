const { getCoursesByCatId } = require('./middleware/getCatcourses');

const { clientError, serverError } = require('./errorHandle');
const { getCourseById } = require('./getCourseDetails');
const getCoursera = require('./coursera/getCourses');
const getFavorite = require('./middleware/getFavorite');

module.exports = {
  clientError,
  serverError,
  getCourseById,
  getCoursesByCatId,
  getCoursera,
  getFavorite,
};
