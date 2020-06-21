const { getCoursesByCatId } = require('./course');

const { clientError, serverError } = require('./errorHandle');

module.exports = {
  clientError,
  serverError,
  getCoursesByCatId,
};
