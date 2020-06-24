const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');
const { addFavorite } = require('../../src/database/queries');
const { deleteFavorite } = require('../../src/database/queries');

describe('test add/delete favorite query', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('the query should add a course to favorite', async () => {
    expect.hasAssertions();
    const results = await addFavorite(2, 4);
    expect(results.rowCount).toStrictEqual(1);
  });

  it('the query should NOT add duplicate rows', async () => {
    expect.hasAssertions();
    const results = await addFavorite(2, 4);
    expect(results.rowCount).toStrictEqual(0);
  });

  it('the query should delete a course from favorite', async () => {
    expect.hasAssertions();
    const results = await deleteFavorite(2, 4);
    expect(results.rowCount).toStrictEqual(1);
  });
});
