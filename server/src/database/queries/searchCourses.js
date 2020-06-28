const connection = require('../config/connection');

const getCourseByName = (name) =>
  connection.query({
    text: `SELECT id, title, image, rate, source
    FROM course WHERE title ILIKE '%${name}%' `,
  });

const getCourseByCatIdName = (catId, name) =>
  connection.query({
    text: `SELECT id, title, image, rate, source
      FROM course WHERE title ILIKE '%${name}%' AND category_id = ${catId} `,
  });

module.exports = { getCourseByName, getCourseByCatIdName };
