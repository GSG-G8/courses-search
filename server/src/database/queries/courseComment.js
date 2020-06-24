const connection = require('../config/connection');

const courseComment = (id) =>
  connection.query(
    'SELECT comment.id as comment_id, users.name, comment.content FROM comment INNER JOIN users ON comment.user_id = users.id where course_id = $1 ',
    [id]
  );

module.exports = courseComment;
