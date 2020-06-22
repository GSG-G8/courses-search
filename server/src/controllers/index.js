const { getCoursesByCatId } = require('./middleware/getCatcourses');

const { clientError, serverError } = require('./errorHandle');
const { getCourseById } = require('./course');

module.exports = {
  clientError,
  serverError,
  getCourseById,
  getCoursesByCatId,
};
