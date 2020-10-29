"use strict";

var https = require('./lib/https.js');

var redirect = require('./lib/redirect.js');

var requestHeader = require('./lib/requestHeader.js');

var responseHeader = require('./lib/responseHeader.js');

var robots = require('./lib/robots.txt.js');

var status = require('./lib/status.js');

module.exports = {
  https: https,
  redirect: redirect,
  requestHeader: requestHeader,
  responseHeader: responseHeader,
  robots: robots,
  status: status
};