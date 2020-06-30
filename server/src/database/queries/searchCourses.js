const connection = require('../config/connection');

const getCourseByCatIdName = (catId, name, offset) =>
  connection.query({
    text: `SELECT id, title, image, rate, source
      FROM course WHERE title ILIKE $1 AND (category_id = $2 OR $2='0' ) order by rate DESC offset $3 limit 10 `,
    values: [`%${name}%`, catId, offset],
  });

const getCourseByCatIdNameCount = (catId, name) =>
  connection.query({
    text: `SELECT count(*)
      FROM course WHERE title ILIKE $1 AND (category_id = $2 OR $2='0')  `,
    values: [`%${name}%`, catId],
  });

module.exports = {
  getCourseByCatIdName,
  getCourseByCatIdNameCount,
};
