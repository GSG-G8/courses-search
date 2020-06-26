const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');
const { deleteFavoriteFolderQuery } = require('../../src/database/queries');

describe('deleteFavoriteFolderQuery query', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('the query should delete a folder from user_favorite_folders table', async () => {
    expect.hasAssertions();
    const { rowCount } = await deleteFavoriteFolderQuery(1, 1);
    expect(rowCount).toStrictEqual(1);
  });

  it('the query should do nothing if user/folder does not exists', async () => {
    expect.hasAssertions();
    const { rowCount } = await deleteFavoriteFolderQuery(10, 1);
    expect(rowCount).toStrictEqual(0);
  });
});
