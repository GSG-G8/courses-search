const connection = require('../config/connection');

const getcourseByCatId = (catId) =>
  connection.query({
    text: `SELECT title, image
        FROM course WHERE category_id=$1;`,
    values: [catId],
  });

module.exports = { getcourseByCatId };
