const request = require('supertest');
const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');

const app = require('../../src/app');

const { USER_ONE_TOKEN, USER_TWO_TOKEN } = process.env;

const userOneToken = `token=${USER_ONE_TOKEN}`;
const usertwoToken = `token=${USER_TWO_TOKEN}`;

describe('get request to /favorite/folder', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('if user has favorite folder will return favorite folder for this user', async () => {
    expect.assertions(2);
    const { body } = await request(app)
      .get('/api/v1/favorite/folder')
      .set('Accept', 'application/json')
      .set('Cookie', userOneToken)
      .expect(200);
    expect(body).toHaveLength(2);
    expect(body).toStrictEqual([
      {
        id: 1,
        title: 'user 1 fav folder 1',
        user_id: 1,
      },
      {
        id: 2,
        title: 'user 1 fav folder 2',
        user_id: 1,
      },
    ]);
  });

  it('if user does not has favorite folder will return empty array', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .get('/api/v1/favorite/folder')
      .set('Accept', 'application/json')
      .set('Cookie', usertwoToken)
      .expect(200);
    expect(body).toStrictEqual([]);
  });

  it('if user id does not exist will return Sign-in first', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .get('/api/v1/favorite/folder')
      .set('Accept', 'application/json')
      .expect(401);
    expect(body).toStrictEqual({
      message: 'Sign-in first',
    });
  });
});
