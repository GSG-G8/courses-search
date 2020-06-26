const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');
const { editFavoriteFolderQuery } = require('../../src/database/queries');

describe('addCourseToFolderQuery', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('add Course To favorite Folder for specific user', async () => {
    expect.hasAssertions();
    const { rowCount } = await editFavoriteFolderQuery('change title', 1);
    expect(rowCount).toStrictEqual(1);
  });
});
