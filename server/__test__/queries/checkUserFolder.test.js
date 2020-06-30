const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');
const { checkUserFolder } = require('../../src/database/queries');

describe('test for checkUserFolder query', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('return id of the favorite folder for this user', async () => {
    expect.assertions(2);
    const { rows } = await checkUserFolder(1);
    expect(rows).toHaveLength(2);
    expect(rows).toStrictEqual([
      {
        id: 1,
      },
      {
        id: 2,
      },
    ]);
  });
});
