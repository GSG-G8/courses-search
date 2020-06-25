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
    expect(body).toStrictEqual({
      courseDetails: {
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
      comments: [
        {
          comment_id: 1,
          name: 'Mohammed',
          content: 'this is my first comment',
        },
        {
          comment_id: 4,
          name: 'omar',
          content: 'comment from 2 user',
        },
        {
          comment_id: 5,
          name: 'omar',
          content: 'comment from 2 user again',
        },
      ],
    });
  });
  it("should return 'course is not available' with course-id '30' doesn't exist", async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/courses/30')
      .set('Accept', 'application/json')
      .expect(404);
    const { message } = res.body;
    expect(message).toBe('Sorry, this course is not available..!');
  });

  it("should return 'invalid inputs' with invalid course-id '-3'", async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/courses/-6')
      .set('Accept', 'application/json')
      .expect(400);
    const { message } = res.body;
    expect(message).toBe('invalid inputs..!');
  });
});
