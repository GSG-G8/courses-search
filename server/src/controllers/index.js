const { clientError, serverError } = require('./errorHandle');
const getCoursera = require('./coursera/getCourses');
const getFavorite = require('./middleware/getFavorite');

module.exports = {
  clientError,
  serverError,
  getCoursera,
  getFavorite,
};
