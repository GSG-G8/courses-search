const request = require('supertest');
const connection = require('../src/database/config/connection');
const dbBuild = require('../src/database/config/build');

const app = require('../src/app');

describe('get all courses', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('get all courses by category id "1"', async () => {
    expect.assertions(5);
    await request(app)
      .get('/api/v1/1/courses')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        const { data } = response.body;
        expect(data[0].id).toBe(1);
        expect(data[0].title).toBe('computer');
        expect(data[0].image).toBe(
          'https://uniweb.qwebbuilder.com.ng/images/onlinecourses.jpg'
        );
        expect(data[0].rate).toBe('3.4');
        expect(data[0].source).toBe('udemy');
      });
  });

  it("should return all courses with category-id doesn't exist", async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/20/courses')
      .set('Accept', 'application/json')
      .expect(404);
    const { message } = res.body;
    expect(message).toBe("Sorry There's no courses for this category..!");
  });

  it('route /:categoryId/courses with wrong categortId status 400', async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/lina/courses')
      .set('Accept', 'application/json')
      .expect(400)
      .expect('Content-Type', /json/);
    const { message } = res.body;
    expect(message).toBe('wrong category Id');
  });
});
