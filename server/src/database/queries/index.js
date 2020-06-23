const { getcourseByCatId } = require('./catCourses');
const addUdemyCourse = require('./addUdemyCourse');
const getFavoriteCourse = require('./getFavoriteCourse');
const getUserById = require('./getUserById');
const insertCourses = require('./insertCourses');
const addUserData = require('./addUserData');

module.exports = {
  getFavoriteCourse,
  getUserById,
  getcourseByCatId,
  addUdemyCourse,
  insertCourses,
  addUserData,
};
