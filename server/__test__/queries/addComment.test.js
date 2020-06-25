const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');
const { addComment } = require('../../src/database/queries');

describe('addComment query', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('should add a new comment to a specific course', async () => {
    expect.hasAssertions();
    const results = await addComment(2, 4, 'hello');
    expect(results.rowCount).toStrictEqual(1);
  });

  it('should NOT add comment to non existing course', async () => {
    expect.hasAssertions();
    const results = await addComment(2, 99999, 'hello');
    expect(results.rowCount).toStrictEqual(0);
  });
});
