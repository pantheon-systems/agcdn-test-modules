"use strict";

var chai = require('chai');

var path = require('path');

var readFileSync = require('fs').readFileSync;

var platformRobots = readFileSync(path.resolve(__dirname, './pantheon_robots.txt')).toString();
var url = "/robots.txt?bust=".concat(Math.random());
/**
 * Test that robots.txt returns a 200 status code.
 * @param {string} domain The domain to access.
 */

var testHttpOk = function testHttpOk(domain) {
  var secureUri = "https://".concat(domain);
  it("it should have a return status of 200 [domain: ".concat(domain, "]"), function () {
    return chai.request(secureUri).get(url).redirects(0).then(function (res) {
      res.should.have.status(200);
    });
  });
};
/**
 * Test that robots.txt matches the platform version.
 * @param {string} domain The domain to access.
 */


var testPlatformRobots = function testPlatformRobots(domain) {
  var secureUri = "https://".concat(domain);
  it("it should match the platform version [domain: ".concat(domain, "]"), function () {
    return chai.request(secureUri).get(url).redirects(0).then(function (res) {
      res.text.should.be.equalIgnoreCase(platformRobots);
    });
  });
};
/**
 * Test that robots.txt matches some arbitrary string.
 * @param {string} domain The domain to access.
 * @param {string} expected The expected contents of robots.txt.
 */


var testLiveRobots = function testLiveRobots(domain, expected) {
  var secureUri = "https://".concat(domain);
  it("it should match the config version [domain: ".concat(domain, "]"), function () {
    return chai.request(secureUri).get(url).redirects(0).then(function (res) {
      var actual = res.text.trimRight();
      actual.should.be.equalIgnoreCase(expected);
    });
  });
};

module.exports = {
  httpOk: testHttpOk,
  platformRobots: testPlatformRobots,
  liveRobots: testLiveRobots
};