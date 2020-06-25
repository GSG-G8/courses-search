const connection = require('../../config/connection');

module.exports = (userId, commentId) =>
  connection.query({
    text: `DELETE FROM comment WHERE user_id = $1 AND id = $2;`,
    values: [userId, commentId],
  });
