const connection = require('../config/connection');

const getTopCourses = () =>
  connection.query(
    ` SELECT id,category_id,title,image,author_name,url,rate,reviews,description, source FROM course order by rate DESC limit 10 `
  );

module.exports = getTopCourses;
