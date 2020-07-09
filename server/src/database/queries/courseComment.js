const connection = require('../config/connection');

const courseComment = (id) =>
  connection.query(
    `SELECT comment.id AS comment_id, comment.created_at, users.name, users.picture, comment.content
    FROM comment INNER JOIN users ON comment.user_id = users.id WHERE course_id = $1`,
    [id]
  );

module.exports = courseComment;
