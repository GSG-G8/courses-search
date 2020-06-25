const connection = require('../config/connection');

const getValues = (courses) => {
  const values = [];
  courses.forEach((course) => {
    values.push(
      course.category_id,
      course.title,
      course.image,
      course.author_name,
      course.url,
      course.rate,
      course.reviews,
      course.description,
      course.source
    );
  });
  return values;
};

const getText = (courses) => {
  const row = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return courses
    .map(
      (course, index) => `(${row.map((v) => `$${index * 9 + v}`).join(',')})`
    )
    .join(',');
};

module.exports = (courses) =>
  connection.query({
    text: `INSERT INTO course
      (category_id, title, image, author_name, url, rate, reviews, description, source)
    VALUES ${getText(courses)}
    ON CONFLICT DO NOTHING;
    `,
    values: getValues(courses),
  });
