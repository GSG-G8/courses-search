const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');
const { getFavoriteCourse } = require('../../src/database/queries');

describe('test for getFavoriteCourse query', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('return the facorite information for the user', async () => {
    expect.assertions(2);
    const { rows } = await getFavoriteCourse(1);
    expect(rows).toHaveLength(2);
    expect(rows).toStrictEqual([
      {
        id: 1,
        category_id: 1,
        title: 'computer',
        image: 'https://uniweb.qwebbuilder.com.ng/images/onlinecourses.jpg',
        author_name: 'Moh',
        url: 'www.course1.com',
        rate: '3.4',
        reviews: '23 reviews',
        description: 'Hi from computer course',
        source: 'fkdsh',
        user_id: 1,
        course_id: 1,
      },
      {
        id: 2,
        category_id: 2,
        title: 'Science',
        image: 'https://uniweb.qwebbuilder.com.ng/images/onlinecourses.jpg',
        author_name: 'Ralef',
        url: 'www.course2.com',
        rate: '4.4',
        reviews: '60 reviews',
        description: 'Hi from Science course',
        source: 'ehgfkdsf',
        user_id: 1,
        course_id: 2,
      },
    ]);
  });
});
