const connection = require('../config/connection');

exports.add = (userId, courseId) =>
  connection.query({
    text: `INSERT INTO favorite (user_id, course_id) VALUES ($1, $2);`,
    values: [userId, courseId],
  });

exports.delete = (userId, courseId) =>
  connection.query({
    text: `DELETE FROM favorite WHERE user_id = $1 AND course_id = $2;`,
    values: [userId, courseId],
  });
