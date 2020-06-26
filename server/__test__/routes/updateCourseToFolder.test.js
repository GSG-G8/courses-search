const request = require('supertest');
const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');

const app = require('../../src/app');

const { USER_ONE_TOKEN } = process.env;

const userOneToken = `token=${USER_ONE_TOKEN}`;

describe('route POST /favorite/add-to-folder', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('user add new favorite course to specific favorite folder successfully', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .post('/api/v1/favorite/add-to-folder')
      .set('Cookie', userOneToken)
      .send({ courseId: 1, folderId: 1 })
      .expect(200);
    expect(body).toStrictEqual({
      message: 'course assigned to folder successfully',
    });
  });

  it('if user favorite user does not exist', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .post('/api/v1/favorite/add-to-folder')
      .set('Cookie', userOneToken)
      .send({ courseId: 1, folderId: 3 })
      .expect(400);
    expect(body).toStrictEqual({
      message: 'this folder not available for this user',
    });
  });

  it('if there is an error in request body data', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .post('/api/v1/favorite/add-to-folder')
      .set('Cookie', userOneToken)
      .send({ courseId: 'text', folderId: 'text' })
      .expect(400);
    expect(body).toStrictEqual({ message: 'invalid inputs..!' });
  });
});
