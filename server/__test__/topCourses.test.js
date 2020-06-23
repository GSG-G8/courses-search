const request = require('supertest');

const app = require('../src/app');
const connection = require('../src/database/config/connection');
const buildDB = require('../src/database/config/build');

describe('get request to /events/:code', () => {
  beforeAll(() => buildDB());
  afterAll(() => connection.end());

  it('should return the top rated courses', async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/courses')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body[0]).toStrictEqual({
      category_id: 3,
      title: 'Phonetics',
      image: 'https://uniweb.qwebbuilder.com.ng/images/onlinecourses.jpg',
      author_name: 'Yaser',
      url: 'www.course3.com',
      rate: '5.4',
      reviews: '50 reviews',
      description: 'Hi from Phonetics course',
      source: 'vsfoijsglas',
    });
  });
});
