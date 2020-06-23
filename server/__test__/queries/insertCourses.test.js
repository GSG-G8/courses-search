const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');
const { insertCourses } = require('../../src/database/queries');

const courses = [
  {
    category_id: 1,
    title: 'web development',
    image: 'http://coursera.org/image/1',
    author_name: 'university 1',
    url: 'http://coursera.org/learn/1',
    rate: '4.2',
    reviews: '1234',
    description: 'development',
    source: 'coursera',
  },
  {
    category_id: 2,
    title: 'mobile development',
    image: 'http://coursera.org/image/2',
    author_name: 'university 2',
    url: 'http://coursera.org/learn/3',
    rate: '4.3',
    reviews: '1234',
    description: 'development',
    source: 'coursera',
  },
];

describe('test insertCourses query', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('the query should insert many courses', async () => {
    expect.hasAssertions();
    const results = await insertCourses(courses);
    expect(results.rowCount).toStrictEqual(courses.length);
  });

  it('the query should NOT insert duplicate courses (url)', async () => {
    expect.hasAssertions();
    const results = await insertCourses(courses);
    expect(results.rowCount).toStrictEqual(0);
  });
});
