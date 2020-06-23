const { getcourseById } = require('./courseDetails');
const { getcourseByCatId } = require('./catCourses');
const addUdemyCourse = require('./addUdemyCourse');
const getFavoriteCourse = require('./getFavoriteCourse');
const getUserById = require('./getUserById');
const insertCourses = require('./insertCourses');

module.exports = {
  getFavoriteCourse,
  getUserById,
  getcourseByCatId,
  addUdemyCourse,
  insertCourses,
  getcourseById,
};
