const { getCoursesByCatId } = require('./middleware/getCatcourses');

const { clientError, serverError } = require('./errorHandle');

module.exports = {
  clientError,
  serverError,
  getCoursesByCatId,
};
