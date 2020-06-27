const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');
const { deleteFavoriteFolderQuery } = require('../../src/database/queries');

describe('deleteFavoriteFolderQuery query', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('the query should delete a folder from user_favorite_folders table', async () => {
    expect.hasAssertions();
    const { rowCount } = await deleteFavoriteFolderQuery(1, 1);
    const { rows, rowCount: result } = await connection.query(
      'SELECT * FROM user_favorite_folders WHERE id = 1 AND user_id = 1'
    );
    expect(rowCount).toStrictEqual(1);
    expect(result).toStrictEqual(0);
    expect(rows).toStrictEqual([]);
  });

  it('the query should do nothing if user/folder does not exists', async () => {
    expect.hasAssertions();
    const { rowCount } = await deleteFavoriteFolderQuery(10, 1);
    expect(rowCount).toStrictEqual(0);
  });
});
