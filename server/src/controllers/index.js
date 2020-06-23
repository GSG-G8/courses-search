const getTopRatedCourses = require('./middleware/getTopRatedCourses');
const { clientError, serverError } = require('./errorHandle');
const getCoursera = require('./coursera/getCourses');
const getFavorite = require('./middleware/getFavorite');

module.exports = {
  clientError,
  serverError,
  getTopRatedCourses,
  getCoursera,
  getFavorite,
};
