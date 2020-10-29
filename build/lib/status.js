"use strict";

var chai = require('chai');
/**
 * Tests that requests to a path have a status.
 * @param {string} domain The domain to test
 * @param {string} path The path to test
 * @param {integer} status The status to test
 */


var testPathStatusIs = function testPathStatusIs(_ref) {
  var domain = _ref.domain,
      _ref$path = _ref.path,
      path = _ref$path === void 0 ? '/' : _ref$path,
      _ref$status = _ref.status,
      status = _ref$status === void 0 ? 200 : _ref$status;
  var secureUri = "https://".concat(domain);
  it("accessing path \"".concat(path, "\" should result in a status of \"").concat(status, "\""), function () {
    var bust = "".concat(path, "?bust=").concat(Math.random());
    return chai.request(secureUri).get(bust).redirects(0).then(function (res) {
      res.should.have.status(status);
    });
  });
};
/**
 * Test that a request returns a 403.
 * @param {string} domain The domain to test
 * @param {string} path The path to test
 */


var testPathIsBlocked = function testPathIsBlocked(_ref2) {
  var domain = _ref2.domain,
      _ref2$path = _ref2.path,
      path = _ref2$path === void 0 ? '/' : _ref2$path;
  return testPathStatusIs({
    domain: domain,
    path: path,
    status: 403
  });
};
/**
 * Test that a request returns a 200.
 * @param {string} domain The domain to test
 * @param {string} path The path to test
 */


var testPathIsOk = function testPathIsOk(_ref3) {
  var domain = _ref3.domain,
      _ref3$path = _ref3.path,
      path = _ref3$path === void 0 ? '/' : _ref3$path;
  return testPathStatusIs({
    domain: domain,
    path: path,
    status: 200
  });
};
/**
 * Test that a request returns a 404.
 * @param {string} domain The domain to test
 * @param {string} path The path to test
 */


var testPathIsNotFound = function testPathIsNotFound(_ref4) {
  var domain = _ref4.domain,
      _ref4$path = _ref4.path,
      path = _ref4$path === void 0 ? '/' : _ref4$path;
  return testPathStatusIs({
    domain: domain,
    path: path,
    status: 404
  });
};

module.exports = {
  statusIs: testPathStatusIs,
  blocked: testPathIsBlocked,
  ok: testPathIsOk,
  notFound: testPathIsNotFound
};