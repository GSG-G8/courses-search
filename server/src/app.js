const express = require('express');
const { join } = require('path');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const router = require('./routes');

const app = express();

app.disabled('x-powered-by');

app.set('port', process.env.PORT || 5000);

const middlewares = [compression(), cookieParser(), express.json()];

app.use(middlewares);

app.use(express.static(join(__dirname, '..', '..', 'client', 'build')));

app.use('/api/v1', router);

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'client', 'build', 'index.html'));
});

module.exports = app;
