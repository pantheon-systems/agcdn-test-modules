const https = require('../lib/https.js');
const redirect = require('../lib/redirect.js');
const requestHeader = require('../lib/requestHeader.js');
const responseHeader = require('../lib/responseHeader.js');
const robots = require('../lib/robots.txt.js');
const status = require('../lib/status.js');

module.exports = {
  https,
  redirect,
  requestHeader,
  responseHeader,
  robots,
  status
};