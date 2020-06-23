const connection = require('../../src/database/config/connection');
const dbBuild = require('../../src/database/config/build');
const { getUserById } = require('../../src/database/queries');

describe('test for getUserById query', () => {
  beforeAll(() => dbBuild());
  afterAll(() => connection.end());

  it('if user exist will return user information', async () => {
    expect.assertions(2);
    const { rows } = await getUserById(1);
    expect(rows).toHaveLength(1);
    expect(rows).toStrictEqual([
      {
        id: 1,
        name: 'Mohammed',
        email: 'hamood-monzer11@hotmail.com',
      },
    ]);
  });
  it('if user does not exist will return empty rows', async () => {
    expect.assertions(2);
    const { rows } = await getUserById(3);
    expect(rows).toHaveLength(0);
    expect(rows).toStrictEqual([]);
  });
});
