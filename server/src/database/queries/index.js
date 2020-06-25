const getTopCourses = require('./getTopCourses');
const { getcourseById } = require('./courseDetails');
const addFutureCourse = require('./addFutureCourses.js');
const { getcourseByCatId } = require('./catCourses');
const addUdemyCourse = require('./addUdemyCourse');
const getFavoriteCourse = require('./getFavoriteCourse');
const insertCourses = require('./insertCourses');
const addUserData = require('./addUserData');
const courseComment = require('./courseComment');
const { getCourseByName, getCourseByCatIdName } = require('./searchCourses');

module.exports = {
  getFavoriteCourse,
  getTopCourses,
  getcourseByCatId,
  addUdemyCourse,
  insertCourses,
  addUserData,
  getcourseById,
  addFutureCourse,
  getCourseByName,
  getCourseByCatIdName,
  courseComment,
};
