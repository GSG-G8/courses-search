const connection = require('../../config/connection');

module.exports = (userId, courseId, content) =>
  connection.query({
    text: `INSERT INTO comment (user_id, course_id, content)
    SELECT $1, $2, $3 WHERE EXISTS (SELECT * FROM course WHERE id = $2) RETURNING id`,
    values: [userId, courseId, content],
  });
