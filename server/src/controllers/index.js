const { getCoursesByCatId } = require('./middleware/getCatcourses');

const { clientError, serverError } = require('./errorHandle');
const getFavorite = require('./middleware/getFavorite');

module.exports = {
  clientError,
  serverError,
  getCoursesByCatId,
  getFavorite,
};
