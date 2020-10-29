"use strict";

var chai = require('chai');
/**
 * Tests that HTTP requests are redirected to HTTPS.
 * @param {string} domain The domain to test
 */


var testHttpToHttps = function testHttpToHttps(domain) {
  // Test case: requests to ${domain} via http are redirected to https.
  var insecureUri = "http://".concat(domain);
  var secureUri = "https://".concat(domain);
  it("accessing the site using http should redirect to https [domain: ".concat(domain, "]"), function () {
    var cachebust = "/?bust=".concat(Math.random());
    return chai.request(insecureUri).get(cachebust).redirects(0).then(function (res) {
      res.should.redirectTo("".concat(secureUri).concat(cachebust));
    });
  });
};
/**
 * Tests that an HSTS header is returned with the response.
 * @param {string} domain The domain to test
 * @param {string} expectedHeader The expected HSTS header
 */


var testHstsHeader = function testHstsHeader(domain) {
  var expectedHeader = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  // Test case: ${domain} returns an HSTS header.
  var secureUri = "https://".concat(domain);
  it("it should contain an HSTS header [domain: ".concat(domain, "]"), function () {
    return chai.request(secureUri).get("/?bust=".concat(Math.random())).redirects(0).then(function (res) {
      res.should.have.header('strict-transport-security');
      if (expectedHeader) res.headers['strict-transport-security'].should.contain(expectedHeader);
    });
  });
};

module.exports = {
  tls: testHttpToHttps,
  hsts: testHstsHeader
};