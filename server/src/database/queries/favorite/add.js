const connection = require('../../config/connection');

module.exports = (userId, courseId) =>
  connection.query({
    text: `INSERT INTO favorite (user_id, course_id)
    SELECT $1, $2 WHERE EXISTS (SELECT * FROM course WHERE id = $2)
    ON CONFLICT DO NOTHING`,
    values: [userId, courseId],
  });
