const { getCoursesByCatId } = require('./middleware/getCatcourses');

const { clientError, serverError } = require('./errorHandle');
const { getCourseDetails } = require('./middleware/getCourseDetails');
const getCoursera = require('./coursera/getCourses');
const getFavorite = require('./middleware/getFavorite');

const addFavorite = require('./favorite/add');
const deleteFavorite = require('./favorite/delete');

module.exports = {
  clientError,
  serverError,
  getCourseDetails,
  getCoursesByCatId,
  getCoursera,
  getFavorite,
  addFavorite,
  deleteFavorite,
};
