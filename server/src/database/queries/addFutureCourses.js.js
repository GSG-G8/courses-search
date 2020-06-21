const connection = require('../config/connection');

const addFutureCourse = ({
  title,
  image,
  url,
  rate,
  reviews,
  description,
  source,
}) => {
  const sql = {
    text:
      'insert into course(title, image, url, rate, reviews, description, source) values($1, $2, $3, $4, $5, $6, $7)',
    values: [title, image, url, rate, reviews, description, source],
  };
  return connection.query(sql);
};

module.exports = addFutureCourse;
