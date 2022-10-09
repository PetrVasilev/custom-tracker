require('dotenv').config();

const setupBackend = require('./backend');
const setupFrontend = require('./frontend');

setupBackend();
setupFrontend();
