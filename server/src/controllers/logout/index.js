const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'logout successfully' });
};

module.exports = logout;
