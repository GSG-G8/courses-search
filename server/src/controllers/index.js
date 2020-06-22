const { clientError, serverError } = require('./errorHandle');
const getCoursera = require('./coursera/getCourses');

module.exports = {
  clientError,
  serverError,
  getCoursera,
};
