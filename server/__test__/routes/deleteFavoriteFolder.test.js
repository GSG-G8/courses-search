const request = require('supertest');
const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');

const app = require('../../src/app');

const { USER_ONE_TOKEN } = process.env;

const userOneToken = `token=${USER_ONE_TOKEN}`;

describe('route DELETE /favorite/folder', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('users should be able to delete favorite folder', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .delete('/api/v1/favorite/folder/2')
      .set('Cookie', userOneToken)
      .expect(200);
    expect(body).toStrictEqual({ message: 'folder deleted successfully' });
  });

  it('if user do not have this folder', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .delete('/api/v1/favorite/folder/2')
      .set('Cookie', userOneToken)
      .expect(400);
    expect(body).toStrictEqual({
      message: 'this folder not available for this user',
    });
  });

  it('unauthorized request should return 401', async () => {
    expect.assertions(0);
    const { body } = await request(app)
      .delete('/api/v1/favorite/folder/1')
      .expect(401);
  });
});
