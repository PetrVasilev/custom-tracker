const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const api = require('./api');

module.exports = () => {
  const app = express();

  mongoose.connect(process.env.MONGO_URL, (err) => {
    if (err) throw err;
    console.log(`MongoDB connected to ${process.env.MONGO_URL}`);
  });

  app.use(cors());

  app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'tracker.script.js')));
  app.use('/', api);

  app.listen(process.env.BACKEND_PORT, () => {
    console.log(`BACKEND listen port ${process.env.BACKEND_PORT}`);
  });
};
