const request = require('supertest');
const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');

const app = require('../../src/app');

const { USER_ONE_TOKEN } = process.env;

const userOneToken = `token=${USER_ONE_TOKEN}`;

describe('route DELETE /favorite/:courseId', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('users should be able delete from favorite', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .delete('/api/v1/favorite/1')
      .set('Cookie', userOneToken)
      .expect(200);
    expect(body.rowCount).toStrictEqual(1);
  });

  it('unauthorized request should return 401', async () => {
    expect.assertions(0);
    const { body } = await request(app)
      .delete('/api/v1/favorite/1')
      .expect(401);
  });
});
