const request = require('supertest');
const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');

const app = require('../../src/app');

const { USER_ONE_TOKEN } = process.env;

const userOneToken = `token=${USER_ONE_TOKEN}`;

describe('route PUT /favorite/folder', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('user update favorite folder name successfully', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .put('/api/v1/favorite/folder')
      .set('Cookie', userOneToken)
      .send({ title: 'change folder name', folderId: 1 })
      .expect(200);
    expect(body).toStrictEqual({
      message: 'folder title updated successfully',
    });
  });

  it('if favorite folder id does not exist for this user', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .put('/api/v1/favorite/folder')
      .set('Cookie', userOneToken)
      .send({ title: 'test', folderId: 3 })
      .expect(400);
    expect(body).toStrictEqual({
      message: 'this folder not available for this user',
    });
  });

  it('if there is an error in request body data', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .put('/api/v1/favorite/folder')
      .set('Cookie', userOneToken)
      .send({ folderId: 1 })
      .expect(400);
    expect(body).toStrictEqual({ message: 'invalid inputs..!' });
  });
});
