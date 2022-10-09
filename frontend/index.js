const express = require('express');
const path = require('path');

module.exports = () => {
  const app = express();

  app.use('/', express.static(path.join(__dirname, 'views')));

  app.listen(process.env.FRONTEND_PORT, () => {
    console.log(`FRONTEND listen port ${process.env.FRONTEND_PORT}`);
  });
};
