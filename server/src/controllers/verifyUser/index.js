const { verify } = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  if (req.cookies && req.cookies.token) {
    verify(req.cookies.token, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        res.status(401).json({ message: 'Un-Authorized' });
      } else {
        req.user = payload;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Sign-in first' });
  }
};
