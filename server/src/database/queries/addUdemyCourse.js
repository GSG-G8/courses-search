const connection = require('../config/connection');

const addUdemyCourse = (data) => {
  const {
    title,
    categoryId,
    image_480x270: image,
    author,
    url,
    rating,
    num_reviews: reviews,
    objectives_summary: description,
    source,
  } = data;
  return connection.query(
    'INSERT INTO course (category_id, title, image, author_name, url, rate, reviews, description, source) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    [
      categoryId,
      title,
      image,
      author,
      `https://www.udemy.com${url}`,
      rating,
      reviews,
      description.join(),
      source,
    ]
  );
};

module.exports = addUdemyCourse;
