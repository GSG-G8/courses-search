const getTopCourses = require('./getTopCourses');
const { getcourseById } = require('./courseDetails');
const { getcourseByCatId } = require('./catCourses');
const addUdemyCourse = require('./addUdemyCourse');
const getFavoriteCourse = require('./getFavoriteCourse');
const addFavorite = require('./favorite/add');
const deleteFavorite = require('./favorite/delete');
const insertCourses = require('./insertCourses');
const addUserData = require('./addUserData');
const courseComment = require('./courseComment');
const { getCourseByName, getCourseByCatIdName } = require('./searchCourses');

module.exports = {
  getFavoriteCourse,
  addFavorite,
  deleteFavorite,
  getTopCourses,
  getcourseByCatId,
  addUdemyCourse,
  insertCourses,
  addUserData,
  getcourseById,
  getCourseByName,
  getCourseByCatIdName,
  courseComment,
};
