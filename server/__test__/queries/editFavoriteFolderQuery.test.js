const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');
const { editFavoriteFolderQuery } = require('../../src/database/queries');

describe('addCourseToFolderQuery', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('add Course To favorite Folder for specific user', async () => {
    expect.hasAssertions();
    const { rowCount } = await editFavoriteFolderQuery('change title', 1);
    const { rows } = await connection.query(
      "SELECT * FROM user_favorite_folders WHERE id = 1 AND title = 'change title'"
    );
    expect(rowCount).toStrictEqual(1);
    expect(rows).toStrictEqual([{ id: 1, title: 'change title', user_id: 1 }]);
  });
});
