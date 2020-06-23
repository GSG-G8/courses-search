const connection = require('../config/connection');

const getTopCourses = () =>
  connection.query(
    ` SELECT category_id,title,image,author_name,url,rate,reviews,description, source FROM course where course.rate='5.4' `
  );

module.exports = getTopCourses;
