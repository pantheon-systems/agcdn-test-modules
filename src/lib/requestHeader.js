const chai = require('chai');

// This test is useful for environments where the request headers are being
// returned as a JSON request from a service like httpbin.

/**
 * Check that a request header exists.
 * @param {string} domain The domain to access.
 * @param {string} headerName The header name to check.
 */
const testRequestHeaderExists = ({domain, headerName, path}) => {
  const secureUri = `https://${domain}`;
  const url = path || '/';
  let prefix = '?';
  if (path.indexOf('?') !== -1) {
    prefix = '&';
  }

  it(`the "${headerName}" header should be present in the request [domain: ${domain}] [path: ${url}]`, () => {
    return chai.request(secureUri)
      .get(`${url}${prefix}bust=${Math.random()}`)
      .then((res) => {
        res.should.be.json;
        res.headers.should.have.property(headerName);
      });
  });
};

/**
 * Test that a request header is present and includes a substring.
 * @param {string} domain The domain to access.
 * @param {string} headerName The header name to check.
 * @param {string} headerValue The value to include.
 */
const testRequestHeaderValueIncludes = ({domain, headerName, headerValue, path}) => {
  const secureUri = `https://${domain}`;
  const url = path || '/';
  let prefix = '?';
  if (path.indexOf('?') !== -1) {
    prefix = '&';
  }

  it(`the "${headerName}" request header should include "${headerValue}" [domain: ${domain}] [path: ${url}]`, () => {
    return chai.request(secureUri)
      .get(`${url}${prefix}bust=${Math.random()}`)
      .redirects(0)
      .then((res) => {
        res.should.be.json;
        res.headers.should.have.property(headerName);
        res.headers[headerName].should.include(headerValue);
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
const testRequestHeaderValueMatches = ({
  domain,
  headerName,
  headerValue,
  path = '/dummy',
  extraHeaders = {}
} = {}) => {
  const secureUri = `https://${domain}`;
  let prefix = '?';
  if (path.indexOf('?') !== -1) {
    prefix = '&';
  }

  it(`the "${headerName}" request header should be set to "${headerValue}" [domain: ${domain}] [path: ${path}]`, () => {
    const req = chai.request(secureUri)
      .get(`${path}${prefix}bust=${Math.random()}`)
      .redirects(0);

    if (!(Object.keys(extraHeaders).length === 0 && extraHeaders.constructor === Object)) {
      req.set(extraHeaders);
    }
    
    return req.then((res) => {
      res.should.be.json;
      res.headers.should.have.property(headerName);
      res.headers[headerName].should.eq(headerValue);
    });
  });
};

module.exports = {
  exists: testRequestHeaderExists,
  includes: testRequestHeaderValueIncludes,
  equals: testRequestHeaderValueMatches
};