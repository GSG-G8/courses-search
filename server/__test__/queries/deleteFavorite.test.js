const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');
const { deleteFavorite } = require('../../src/database/queries');

describe('deleteFavorite query', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('the query should delete a course from favorite', async () => {
    expect.hasAssertions();
    const results = await deleteFavorite(1, 1);
    expect(results.rowCount).toStrictEqual(1);
  });

  it('the query should do nothing if user/course does not exists', async () => {
    expect.hasAssertions();
    const results = await deleteFavorite(99999, 99999);
    expect(results.rowCount).toStrictEqual(0);
  });
});
