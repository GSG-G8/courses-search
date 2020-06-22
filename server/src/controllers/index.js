const getTopRatedCourses = require('./routes');
const { clientError, serverError } = require('./errorHandle');

module.exports = {
  clientError,
  serverError,
  getTopRatedCourses,
};
