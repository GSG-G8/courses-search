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
    const { rows } = await connection.query(
      "SELECT * FROM user_favorite_folders WHERE user_id = 1 AND title = 'first folder from test'"
    );
    expect(rowCount).toStrictEqual(1);
    expect(rows).toStrictEqual([
      { id: 3, title: 'first folder from test', user_id: 1 },
    ]);
  });
});
