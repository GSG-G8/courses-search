const request = require('supertest');
const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');

const app = require('../../src/app');

const { USER_ONE_TOKEN } = process.env;

const userOneToken = `token=${USER_ONE_TOKEN}`;

describe('route POST /favorite/folder', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('user add new favorite folder successfully', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .post('/api/v1/favorite/folder')
      .send({ title: 'first folder for user 1' })
      .set('Cookie', userOneToken)
      .expect(200);
    expect(body).toStrictEqual({ message: 'folder add successfully' });
  });

  it('un valid title in request body', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .post('/api/v1/favorite/folder')
      .send({ title: undefined })
      .set('Cookie', userOneToken)
      .expect(400);
    expect(body).toStrictEqual({ message: 'invalid inputs..!' });
  });

  it('if request body do not have title property', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .post('/api/v1/favorite/folder')
      .send({})
      .set('Cookie', userOneToken)
      .expect(400);
    expect(body).toStrictEqual({ message: 'invalid inputs..!' });
  });

  it('if user token does not exist', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .post('/api/v1/favorite/folder')
      .send({ title: 'first folder for unknown user' })
      .expect(401);
    expect(body).toStrictEqual({ message: 'Sign-in first' });
  });
});
