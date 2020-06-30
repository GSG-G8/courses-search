const connection = require('../config/connection');

const checkUserFolder = (userId) =>
  connection.query(`select id from user_favorite_folders where user_id = $1`, [
    userId,
  ]);

module.exports = checkUserFolder;
