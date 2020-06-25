const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { insertCourses } = require('../../database/queries');
const categoryId = require('./categoryId');
const categoryData = require('./categoryData');

module.exports = async (req, res, next) => {
  await axios.get('https://www.futurelearn.com/courses').then((result) => {
    const $ = cheerio.load(result.data);
    const courses = [];

    $('.m-card').each((i, el) => {
      const title = $(el).find('h4').text();
      const image = $(el).find('.image-cover_3Epqi').attr('src');
      const description = $(el).find('p').text();
      const url = `futurelearn.com${$(el).find('a').attr('href')}`;
      const source = 'Future Learn';
      const courseRate = $(el).find('.ReviewStars-text_mSEFD').text();
      const rate = courseRate.slice(0, 3);
      const reviews = courseRate.slice(4);
      const categoriesId = categoryId[title];

      courses[i] = {
        title,
        image,
        rate,
        description,
        url,
        source,
        reviews,
        categoriesId,
      };
      // fs.writeFile('courses1.json', JSON.stringify(courses, null, 4), (err) => {
      //   if (err) throw err;
      // });
    });
  });
  const allData = categoryData.map((course) => ({
    category_id: categoryId[course.title],
    title: course.title,
    image: course.img,
    author_name: 'Future-Learn.com',
    url: `futurelearn.com${course.link}`,
    rate: course.rate.slice(0, 3) || 0,
    reviews: course.rate.slice(4) || 0,
    description: course.description,
    source: 'Future LEarn',
  }));
  await insertCourses(allData);
  res.json({ count: categoryData.length });
};
