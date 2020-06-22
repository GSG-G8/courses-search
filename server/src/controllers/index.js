const getTopRatedCourses = require('./middleware/getTopRatedCourses');
const { clientError, serverError } = require('./errorHandle');

module.exports = {
  clientError,
  serverError,
  getTopRatedCourses,
};
