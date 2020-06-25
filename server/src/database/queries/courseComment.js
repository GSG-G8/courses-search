const connection = require('../config/connection');

const courseComment = (id) =>
  connection.query(
    'SELECT comment.id AS comment_id, users.name, comment.content FROM comment INNER JOIN users ON comment.user_id = users.id WHERE course_id = $1 ',
    [id]
  );

module.exports = courseComment;
