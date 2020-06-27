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
      .expect(401);
    expect(body).toStrictEqual({
      message: 'Un-Authorized',
    });
  });

  it('if there is an error in folderId', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .delete('/api/v1/favorite/folder/test')
      .set('Cookie', userOneToken)
      .expect(400);
    expect(body).toStrictEqual({
      message: 'invalid inputs..!',
    });
  });

  it('if user do not have token', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .delete('/api/v1/favorite/folder/1')
      .expect(401);
    expect(body).toStrictEqual({
      message: 'Sign-in first',
    });
  });
});
