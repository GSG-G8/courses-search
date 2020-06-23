const getTopCourses = require('./getTopCourses');
const { getcourseByCatId } = require('./catCourses');
const addUdemyCourse = require('./addUdemyCourse');
const getFavoriteCourse = require('./getFavoriteCourse');
const getUserById = require('./getUserById');
const insertCourses = require('./insertCourses');

module.exports = {
  getFavoriteCourse,
  getUserById,
  getTopCourses,
  getcourseByCatId,
  addUdemyCourse,
  insertCourses,
};
