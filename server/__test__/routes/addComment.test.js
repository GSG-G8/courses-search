const request = require('supertest');
const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');

const app = require('../../src/app');

const { USER_ONE_TOKEN } = process.env;

const userOneToken = `token=${USER_ONE_TOKEN}`;

describe('route POST /comment/:courseId', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('should add a new comment to a specific course', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .post('/api/v1/comment/4')
      .send({ content: 'hello' })
      .set('Cookie', userOneToken)
      .expect(200);
    expect(body.rowCount).toStrictEqual(1);
  });

  it('should reject unauthorized users', async () => {
    expect.assertions(0);
    const { body } = await request(app)
      .post('/api/v1/comment/4')
      .send({ content: 'hello' })
      .expect(401);
  });
});
