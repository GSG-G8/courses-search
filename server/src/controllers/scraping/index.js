const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

axios.get('https://www.futurelearn.com/courses').then((res) => {
  const $ = cheerio.load(res.data);
  const courses = [];

  $('.m-card').each((i, el) => {
    const title = $(el).find('h4').text();
    const img = $(el).find('.image-cover_3Epqi').attr('src');
    const rate = $(el).find('.ReviewStars-text_mSEFD').text();
    const description = $(el).find('p').text();
    const link = $(el).find('a').attr('href');

    courses[i] = { title, img, rate, description, link };

    fs.writeFile('courses.json', JSON.stringify(courses, null, 4), (err) => {
      if (err) throw err;
    });
  });
});
