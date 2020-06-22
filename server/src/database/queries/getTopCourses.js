const connection = require('../config/connection');

const getTopCourses = () =>
  connection.query(
    'SELECT category_id,title,image,author_name,url,rate,reviews,description, source FROM course WHERE rate >= "4.5" '
  );

module.exports = getTopCourses;
