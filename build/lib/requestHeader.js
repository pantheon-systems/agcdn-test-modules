"use strict";

var chai = require('chai'); // This test is useful for environments where the request headers are being
// returned as a JSON request from a service like httpbin.

/**
 * Check that a request header exists.
 * @param {string} domain The domain to access.
 * @param {string} headerName The header name to check.
 */


var testRequestHeaderExists = function testRequestHeaderExists(_ref) {
  var domain = _ref.domain,
      headerName = _ref.headerName,
      path = _ref.path;
  var secureUri = "https://".concat(domain);
  var url = path || '/';
  it("the \"".concat(headerName, "\" header should be present in the request [domain: ").concat(domain, "] [path: ").concat(url, "]"), function () {
    return chai.request(secureUri).get("".concat(url, "?bust=").concat(Math.random)).then(function (res) {
      res.should.be.json;
      res.body.headers.should.have.property(headerName);
    });
  });
};
/**
 * Test that a request header is present and includes a substring.
 * @param {string} domain The domain to access.
 * @param {string} headerName The header name to check.
 * @param {string} headerValue The value to include.
 */


var testRequestHeaderValueIncludes = function testRequestHeaderValueIncludes(_ref2) {
  var domain = _ref2.domain,
      headerName = _ref2.headerName,
      headerValue = _ref2.headerValue,
      path = _ref2.path;
  var secureUri = "https://".concat(domain);
  var url = path || '/';
  it("the \"".concat(headerName, "\" request header should include \"").concat(headerValue, "\" [domain: ").concat(domain, "] [path: ").concat(url, "]"), function () {
    return chai.request(secureUri).get("".concat(url, "?bust=").concat(Math.random())).redirects(0).then(function (res) {
      res.should.be.json;
      res.body.headers.should.have.property(headerName);
      res.body.headers[headerName].should.include(headerValue);
    });
  });
};
/**
 * Test that a request header is present and matches a string.
 * @param {string} domain The domain to access.
 * @param {string} headerName The header name to check.
 * @param {string} headerValue The value to match.
 * @param {string} [path=/dummy] The path to use
 * @param {Object} [extraHeaders={}] An object of extra headers
 */


var testRequestHeaderValueMatches = function testRequestHeaderValueMatches() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      domain = _ref3.domain,
      headerName = _ref3.headerName,
      headerValue = _ref3.headerValue,
      _ref3$path = _ref3.path,
      path = _ref3$path === void 0 ? '/dummy' : _ref3$path,
      _ref3$extraHeaders = _ref3.extraHeaders,
      extraHeaders = _ref3$extraHeaders === void 0 ? {} : _ref3$extraHeaders;

  var secureUri = "https://".concat(domain);
  it("the \"".concat(headerName, "\" request header should be set to \"").concat(headerValue, "\" [domain: ").concat(domain, "] [path: ").concat(path, "]"), function () {
    var req = chai.request(secureUri).get("".concat(path, "?bust=").concat(Math.random())).redirects(0);

    if (!(Object.keys(extraHeaders).length === 0 && extraHeaders.constructor === Object)) {
      req.set(extraHeaders);
    }

    return req.then(function (res) {
      res.should.be.json;
      res.body.headers.should.have.property(headerName);
      res.body.headers[headerName].should.eq(headerValue);
    });
  });
};

module.exports = {
  exists: testRequestHeaderExists,
  includes: testRequestHeaderValueIncludes,
  equals: testRequestHeaderValueMatches
};