const connection = require('../config/connection');

const getUserById = (userId) =>
  connection.query('select * from users where id = $1;', [userId]);

module.exports = getUserById;
