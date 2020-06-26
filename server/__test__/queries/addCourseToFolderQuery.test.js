const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');
const {
  addCourseToFolderQuery,
  addFavoriteFolderQuery,
} = require('../../src/database/queries');

describe('addCourseToFolderQuery', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('add Course To favorite Folder for specific user', async () => {
    expect.hasAssertions();
    await addFavoriteFolderQuery(2, 'first folder for user 2');
    const { rowCount } = await addCourseToFolderQuery(2, 1, 3);
    expect(rowCount).toStrictEqual(1);
  });
});
