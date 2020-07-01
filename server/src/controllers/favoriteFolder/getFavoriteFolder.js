const { getFavoriteFolderQuery } = require('../../database/queries');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { rows } = await getFavoriteFolderQuery(id);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
