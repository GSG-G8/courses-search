const connection = require('../config/connection');

exports.add = (userId, courseId, content) =>
  connection.query({
    text: `INSERT INTO comment (content, user_id, course_id) VALUES ($1, $2, $3);`,
    values: [userId, courseId, content],
  });

exports.delete = (id) =>
  connection.query({
    text: `DELETE FROM comment WHERE id = $1;`,
    values: [id],
  });

exports.get = (courseId) =>
  connection.query({
    text: `SELECT * FROM comment WHERE course_id = $1;`,
    values: [courseId],
  });
