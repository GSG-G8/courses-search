const { getFavoriteFolderQuery } = require('../../database/queries');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { rows } = await getFavoriteFolderQuery(id);
    if (rows.length) {
      res.json(rows);
    } else {
      res.json({
        message: 'There is no favorite folder for this user id',
      });
    }
  } catch (err) {
    next(err);
  }
};
