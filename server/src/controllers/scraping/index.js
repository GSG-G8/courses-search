const axios = require('axios');
const cheerio = require('cheerio');
const addFutureCourse = require('../../database/queries');

axios.get('https://www.futurelearn.com/courses').then((res) => {
  const $ = cheerio.load(res.data);
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

    courses[i] = { title, image, rate, description, url, source, reviews };
    addFutureCourse(courses[i]);
  });
});
