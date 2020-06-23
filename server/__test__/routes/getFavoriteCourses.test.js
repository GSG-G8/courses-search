const request = require('supertest');
const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');

const app = require('../../src/app');

describe('get request to /favorite/:userId', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('if user have favotite course will return favorite courses for this user', async () => {
    expect.assertions(2);
    const { body } = await request(app)
      .get('/api/v1/favorite/1')
      .set('Accept', 'application/json')
      .expect(200);
    expect(body).toHaveLength(2);
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
        user_id: 1,
        course_id: 1,
      },
      {
        id: 2,
        category_id: 2,
        title: 'Science',
        image: 'https://uniweb.qwebbuilder.com.ng/images/onlinecourses.jpg',
        author_name: 'Ralef',
        url: 'www.course2.com',
        rate: '4.4',
        reviews: '60 reviews',
        description: 'Hi from Science course',
        source: 'udemy',
        user_id: 1,
        course_id: 2,
      },
    ]);
  });

  it('if user dont have favotite course will return message (this user dont have favorite course)', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .get('/api/v1/favorite/2')
      .set('Accept', 'application/json')
      .expect(200);
    expect(body).toStrictEqual({
      message: 'There is no favorite courses for this user id',
    });
  });

  it('if user id does not exits will return Invalid user id', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .get('/api/v1/favorite/3')
      .set('Accept', 'application/json')
      .expect(404);
    expect(body).toStrictEqual({
      message: 'Invalid id',
    });
  });
});
