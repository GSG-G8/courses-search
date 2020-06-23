const request = require('supertest');
const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');

const app = require('../../src/app');

describe('get course details', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());
  it('get all details for course with id = 1', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .get('/api/v1/courses/1')
      .set('Accept', 'application/json')
      .expect(200);
    expect(body).toStrictEqual([
      {
        id: 1,
        category_id: 1,
        title: 'computer',
        image: 'https://uniweb.qwebbuilder.com.ng/images/onlinecourses.jpg',
        author_name: 'Moh',
        url: 'www.course1.com',
        rate: '3.4',
        reviews: '23 reviews',
        description: 'Hi from computer course',
        source: 'udemy',
      },
    ]);
  });
  it("should return all courseDetails with course-id doesn't exist", async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/courses/30')
      .set('Accept', 'application/json')
      .expect(404);
    const { message } = res.body;
    expect(message).toBe('Sorry, this course is not avalible..!');
  });
});
