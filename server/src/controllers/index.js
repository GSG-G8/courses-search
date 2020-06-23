const getTopRatedCourses = require('./middleware/getTopRatedCourses');
const { clientError, serverError } = require('./errorHandle');
const getFavorite = require('./middleware/getFavorite');

module.exports = {
  clientError,
  serverError,
  getTopRatedCourses,
  getFavorite,
};
