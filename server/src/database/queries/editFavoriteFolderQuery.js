const connection = require('../config/connection');

const editFavoriteFolderQuery = (title, folderId) =>
  connection.query(
    `UPDATE user_favorite_folders SET title = $1 WHERE id = $2 `,
    [title, folderId]
  );

module.exports = editFavoriteFolderQuery;
