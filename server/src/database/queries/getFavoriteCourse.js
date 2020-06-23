const connection = require('../config/connection');

const getFavoriteCourse = (userId) =>
  connection.query(
    'SELECT * FROM course INNER JOIN favorite ON course.id = favorite.course_id WHERE user_id = $1;',
    [userId]
  );
module.exports = getFavoriteCourse;
