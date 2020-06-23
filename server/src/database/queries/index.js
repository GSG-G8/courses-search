const addFutureCourse = require('./addFutureCourses.js');

const { getcourseByCatId } = require('./catCourses');
const addUdemyCourse = require('./addUdemyCourse');
const getFavoriteCourse = require('./getFavoriteCourse');
const getUserById = require('./getUserById');
const insertCourses = require('./insertCourses');
const { getCourseByName, getCourseByCatIdName } = require('./searchCourses');

module.exports = {
  getFavoriteCourse,
  getUserById,
  getcourseByCatId,
  addUdemyCourse,
  insertCourses,
  addFutureCourse,
  getCourseByName,
  getCourseByCatIdName,
};
