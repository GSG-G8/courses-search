const connection = require('../config/connection');

const getcourseById = (id) =>
  connection.query({
    text: `SELECT * FROM course  WHERE id=$1;`,
    values: [id],
  });
module.exports = { getcourseById };
