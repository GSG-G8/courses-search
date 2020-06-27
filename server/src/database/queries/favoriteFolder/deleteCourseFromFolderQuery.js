const connection = require('../../config/connection');

const deleteCourseFromFolderQuery = (userId, courseId, folderId) =>
  connection.query(
    `UPDATE favorite SET folder_id = $1 WHERE user_id = $2 AND course_id = $3 RETURNING *`,
    [folderId, userId, courseId]
  );

module.exports = deleteCourseFromFolderQuery;
