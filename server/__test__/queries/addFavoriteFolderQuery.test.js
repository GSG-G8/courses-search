const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');
const { addFavoriteFolderQuery } = require('../../src/database/queries');

describe('addFavoriteFolderQuery', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('the query should add a new favorite folder to specific user', async () => {
    expect.hasAssertions();
    const { rowCount } = await addFavoriteFolderQuery(
      1,
      'first folder from test'
    );
    expect(rowCount).toStrictEqual(1);
  });
});
