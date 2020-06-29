const connection = require('../../config/connection');

const addFavoriteFolderQuery = (userId, title) =>
  connection.query(
    'INSERT INTO user_favorite_folders (user_id, title) VALUES ($1, $2)',
    [userId, title]
  );

module.exports = addFavoriteFolderQuery;
