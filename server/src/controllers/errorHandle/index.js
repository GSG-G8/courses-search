exports.clientError = (req, res) => {
  res.status(404).json({ message: 'Page Not Found' });
};

exports.serverError = (err, req, res, next) => {
  res.status(500).json({ message: 'Something went wrong, try again later' });
};
