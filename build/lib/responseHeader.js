"use strict";

var chai = require('chai'); // Note that we're not doing a "describe()" block here because this is a more
// generic test case to check any old response header.

/**
 * Check that a response header exists.
 * @param {string} domain The domain to access.
 * @param {string} headerName The header name to check.
 * @param {string} [path=/] The path to check.
 */


var testResponseHeaderExists = function testResponseHeaderExists(domain, headerName) {
  var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '/';
  var secureUri = "https://".concat(domain).concat(path);
  it("the \"".concat(headerName, "\" header should be present in the response [domain: ").concat(domain, "]"), function () {
    return chai.request(secureUri).get("/?bust=".concat(Math.random())).redirects(0).then(function (res) {
      res.should.have.header(headerName);
    });
  });
};
/**
 * Test that a response header is present and includes a substring.
 * @param {string} domain The domain to access.
 * @param {string} headerName The header name to check.
 * @param {string} headerValue The value to include.
 * @param {string} [path=/] The path to check.
 */


var testResponseHeaderValueIncludes = function testResponseHeaderValueIncludes(domain, headerName, headerValue) {
  var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/';
  var secureUri = "https://".concat(domain).concat(path);
  it("the \"".concat(headerName, "\" response header should include \"").concat(headerValue, "\" [domain: ").concat(domain, "]"), function () {
    return chai.request(secureUri).get("/?bust=".concat(Math.random())).redirects(0).then(function (res) {
      res.should.have.header(headerName);
      res.headers[headerName.toLowerCase()].should.include(headerValue);
    });
  });
};
/**
 * Test that a response header is present and matches a string.
 * @param {string} domain The domain to access.
 * @param {string} headerName The header name to check.
 * @param {string} headerValue The value to match.
 * @param {string} [path=/] The path to check.
 */


var testResponseHeaderValueMatches = function testResponseHeaderValueMatches(domain, headerName, headerValue) {
  var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/';
  var secureUri = "https://".concat(domain).concat(path);
  it("the \"".concat(headerName, "\" response header should be set to \"").concat(headerValue, "\" [domain: ").concat(domain, "]"), function () {
    return chai.request(secureUri).get("/?bust=".concat(Math.random())).redirects(0).then(function (res) {
      res.should.have.header(headerName);
      res.headers[headerName].should.eq(headerValue);
    });
  });
};
/**
 * Test that a response header has n number of values.
 * @param {string} domain The domain to access.
 * @param {string} headerName The header name to check.
 * @param {number} count The expected count of values for that header.
 * @param {string} [splitOn=,] The string to use when splitting the values.
 * @param {string} [path=/] The path to check.
 */


var testResponseHeaderValueCountIs = function testResponseHeaderValueCountIs(domain, headerName, count) {
  var splitOn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ',';
  var path = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '/';
  var secureUri = "https://".concat(domain).concat(path);
  it("the \"".concat(headerName, "\" response header should contain ").concat(count, " values [domain: ").concat(domain, "]"), function () {
    return chai.request(secureUri).get("/?bust=".concat(Math.random())).redirects(0).then(function (res) {
      res.should.have.header(headerName);
      var actualCount = res.headers[headerName.toLowerCase()].split(splitOn).length;
      actualCount.should.eq(count);
    });
  });
};

module.exports = {
  exists: testResponseHeaderExists,
  includes: testResponseHeaderValueIncludes,
  equals: testResponseHeaderValueMatches,
  countEquals: testResponseHeaderValueCountIs
};