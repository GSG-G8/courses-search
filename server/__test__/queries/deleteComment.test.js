const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');
const { deleteComment } = require('../../src/database/queries');

describe('deleteComment query', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('should delete a comment by id', async () => {
    expect.hasAssertions();
    const results = await deleteComment(1, 1);
    expect(results.rowCount).toStrictEqual(1);
  });

  it('should do nothing if the comment does not exists', async () => {
    expect.hasAssertions();
    const results = await deleteComment(1, 99999);
    expect(results.rowCount).toStrictEqual(0);
  });
});
