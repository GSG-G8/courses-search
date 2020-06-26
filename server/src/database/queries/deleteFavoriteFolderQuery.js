const connection = require('../config/connection');

const deleteFavoriteFolderQuery = (folderId, userId) =>
  connection.query(
    `DELETE FROM user_favorite_folders WHERE id = $1 AND user_id = $2;`,
    [folderId, userId]
  );

module.exports = deleteFavoriteFolderQuery;
