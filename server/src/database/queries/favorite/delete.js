const connection = require('../../config/connection');

module.exports = (userId, courseId) =>
  connection.query({
    text: `DELETE FROM favorite WHERE user_id = $1 AND course_id = $2;`,
    values: [userId, courseId],
  });
