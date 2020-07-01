const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');
const { getFavoriteFolderQuery } = require('../../src/database/queries');

describe('test for getFavoriteFolderQuery query', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('return the favorite folder information for the user', async () => {
    expect.assertions(2);
    const { rows } = await getFavoriteFolderQuery(1);
    expect(rows).toHaveLength(2);
    expect(rows).toStrictEqual([
      {
        id: 1,
        title: 'user 1 fav folder 1',
        user_id: 1,
      },
      {
        id: 2,
        title: 'user 1 fav folder 2',
        user_id: 1,
      },
    ]);
  });
});
