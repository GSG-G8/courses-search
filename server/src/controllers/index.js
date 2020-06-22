const { getCoursesByCatId } = require('./middleware/course');

const { clientError, serverError } = require('./errorHandle');

module.exports = {
  clientError,
  serverError,
  getCoursesByCatId,
};
