const { getcourseByCatId } = require('../../database/queries');

module.exports = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    if (categoryId > 0) {
      const { rows } = await getcourseByCatId(categoryId);
      if (rows.length !== 0) {
        res.json(rows);
      } else {
        res.status(404).json({
          message: "Sorry There's no courses for this category..!",
        });
      }
    } else {
      res.status(400).json({
        message: 'wrong category Id',
      });
    }
  } catch (err) {
    next(err);
  }
};
