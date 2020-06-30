const {
  addCourseToFolderQuery,
  addFavoriteFolderQuery,
  deleteCourseFromFolderQuery,
  deleteFavoriteFolderQuery,
  editFavoriteFolderQuery,
} = require('./favoriteFolder');

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
const checkUserFolder = require('./checkUserFolder');
const {
  getCourseByCatIdName,
  getCourseByCatIdNameCount,
} = require('./searchCourses');

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
  getCourseByCatIdName,
  courseComment,
  addFavoriteFolderQuery,
  addCourseToFolderQuery,
  checkUserFolder,
  editFavoriteFolderQuery,
  deleteFavoriteFolderQuery,
  deleteCourseFromFolderQuery,
  getCourseByCatIdNameCount,
};
