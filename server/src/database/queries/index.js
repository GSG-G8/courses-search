const getTopCourses = require('./getTopCourses');
const { getcourseById } = require('./courseDetails');
const { getcourseByCatId } = require('./catCourses');
const addUdemyCourse = require('./addUdemyCourse');
const getFavoriteCourse = require('./getFavoriteCourse');
const addFavorite = require('./favorite/add');
const deleteFavorite = require('./favorite/delete');
const addComment = require('./comment/add');
const deleteComment = require('./comment/delete');
const getUserById = require('./getUserById');
const insertCourses = require('./insertCourses');
const addUserData = require('./addUserData');
const { getCourseByName, getCourseByCatIdName } = require('./searchCourses');

module.exports = {
  getFavoriteCourse,
  addFavorite,
  deleteFavorite,
  addComment,
  deleteComment,
  getUserById,
  getTopCourses,
  getcourseByCatId,
  addUdemyCourse,
  insertCourses,
  addUserData,
  getcourseById,
  getCourseByName,
  getCourseByCatIdName,
};
