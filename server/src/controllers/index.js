const { getCoursesByCatId } = require('./middleware/getCatcourses');

const { clientError, serverError } = require('./errorHandle');
const { getCourseById } = require('./getCourseDetails');

module.exports = {
  clientError,
  serverError,
  getCourseById,
  getCoursesByCatId,
};
