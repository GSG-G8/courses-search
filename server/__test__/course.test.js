const request = require('supertest');
const connection = require('../src/database/config/connection');
const dbBuild = require('../src/database/config/build');

const app = require('../src/app');

describe('get all courses', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('get all courses by category id "1"', () =>
    new Promise((done) => {
      request(app)
        .get('/1/courses')
        .set('Content-Type', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          const { data } = res.body;
          expect(data.id).toBe(1);
          expect(data.title).toBe('java');
          expect(data.image).toBe(
            'https://uniweb.qwebbuilder.com.ng/images/onlinecourses.jpg'
          );
          expect(data.rate).toBe('3');

          return done();
        });
    }));
});
