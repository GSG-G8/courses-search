const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');
const { deleteCourseFromFolderQuery } = require('../../src/database/queries');

describe('deleteCourseFromFolderQuery query', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('the query should remove a course from specific folder', async () => {
    expect.hasAssertions();
    const { rows, rowCount } = await deleteCourseFromFolderQuery(1, 1);
    expect(rowCount).toStrictEqual(1);
    expect(rows).toStrictEqual([{ user_id: 1, course_id: 1, folder_id: null }]);
  });

  it('the query should do nothing if user/folder does not exists', async () => {
    expect.hasAssertions();
    const { rowCount } = await deleteCourseFromFolderQuery(1, 3, 5);
    expect(rowCount).toStrictEqual(0);
  });
});
