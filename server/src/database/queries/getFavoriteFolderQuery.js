const connection = require('../config/connection');

const getFavoriteFolderQuery = (userId) =>
  connection.query('SELECT * FROM user_favorite_folders WHERE user_id = $1;', [
    userId,
  ]);
module.exports = getFavoriteFolderQuery;
