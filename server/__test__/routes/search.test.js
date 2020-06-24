const request = require('supertest');
const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');

const app = require('../../src/app');

describe('post request to /register', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());
  it('return the courses that the user search for', async () => {
    expect.assertions(0);
    const reqBody = {
      courseName: 'computer',
      catId: 1,
    };

    await request(app)
      .post('/api/v1/catId/courseName')
      .send(reqBody)
      .set('Accept', 'application/json')
      .expect(200);
  });
});
