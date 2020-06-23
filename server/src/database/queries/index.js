const { getcourseByCatId } = require('./catCourses');
const getFavoriteCourse = require('./getFavoriteCourse');
const getUserById = require('./getUserById');

module.exports = {
  getFavoriteCourse,
  getUserById,
  getcourseByCatId,
};
