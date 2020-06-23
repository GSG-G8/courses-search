const connection = require('../config/connection');

const getUserById = (userId) =>
  connection.query('SELECT * FROM users WHERE id = $1;', [userId]);

module.exports = getUserById;
