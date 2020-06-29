const request = require('supertest');
const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');

const app = require('../../src/app');

const { USER_ONE_TOKEN } = process.env;

const userOneToken = `token=${USER_ONE_TOKEN}`;

describe('route DELETE /favorite/folder/:folderId/:courseId', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('users should be able to remove course from favorite folder', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .delete('/api/v1/favorite/folder/1/1')
      .set('Cookie', userOneToken)
      .expect(200);
    expect(body).toStrictEqual({
      message: 'course remove from folder successfully',
    });
  });

  it('if user does not has a specific  folder', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .delete('/api/v1/favorite/folder/3/1')
      .set('Cookie', userOneToken)
      .expect(401);
    expect(body).toStrictEqual({
      message: 'Un-Authorized',
    });
  });

  it('unauthorized request should return 401', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .delete('/api/v1/favorite/folder/1/3')
      .set('Cookie', userOneToken)
      .expect(404);
    expect(body).toStrictEqual({
      message: 'course not in your favorite',
    });
  });
});
