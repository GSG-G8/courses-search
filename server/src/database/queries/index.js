const getTopCourses = require('./getTopCourses');
const { getcourseById } = require('./courseDetails');
const { getcourseByCatId } = require('./catCourses');
const addUdemyCourse = require('./addUdemyCourse');
const getFavoriteCourse = require('./favorite/getFavoriteCourse');
const addFavorite = require('./favorite/add');
const deleteFavorite = require('./favorite/delete');
const addComment = require('./comment/add');
const deleteComment = require('./comment/delete');
const insertCourses = require('./insertCourses');
const addUserData = require('./addUserData');
const courseComment = require('./courseComment');
const addFavoriteFolderQuery = require('./addFavoriteFolderQuery');
const addCourseToFolderQuery = require('./addCourseToFolderQuery');
const checkUserFolder = require('./checkUserFolder');
const { getCourseByName, getCourseByCatIdName } = require('./searchCourses');

module.exports = {
  getFavoriteCourse,
  addFavorite,
  deleteFavorite,
  addComment,
  deleteComment,
  getTopCourses,
  getcourseByCatId,
  addUdemyCourse,
  insertCourses,
  addUserData,
  getcourseById,
  getCourseByName,
  getCourseByCatIdName,
  courseComment,
  addFavoriteFolderQuery,
  addCourseToFolderQuery,
  checkUserFolder,
};
