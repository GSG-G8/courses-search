const request = require('supertest');
const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');

const app = require('../../src/app');

const { USER_ONE_TOKEN } = process.env;

const userOneToken = `token=${USER_ONE_TOKEN}`;

describe('route POST /comment/add/:courseId', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('should delete a comment by id', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .delete('/api/v1/comment/delete/1')
      .set('Cookie', userOneToken)
      .expect(200);
    expect(body.rowCount).toStrictEqual(1);
  });

  it('should NOT delete other users comments', async () => {
    expect.assertions(1);
    const { body } = await request(app)
      .delete('/api/v1/comment/delete/4')
      .set('Cookie', userOneToken)
      .expect(200);
    expect(body.rowCount).toStrictEqual(0);
  });

  it('should reject unauthorized users', async () => {
    expect.assertions(0);
    const { body } = await request(app)
      .delete('/api/v1/comment/delete/1')
      .expect(401);
  });
});
