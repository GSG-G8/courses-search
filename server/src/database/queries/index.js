const getTopCourses = require('./getTopCourses');
const { getcourseById } = require('./courseDetails');
const addFutureCourse = require('./addFutureCourses.js');
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
  getcourseById,
  addFutureCourse,
};
