import chai from 'chai';

// Note that we're not doing a "describe()" block here because this is a more
// generic test case to check any old response header.

/**
 * Check that a response header exists.
 * @param {string} domain The domain to access.
 * @param {string} headerName The header name to check.
 */
const testResponseHeaderExists = (domain, headerName, path = '/') => {
  const secureUri = `https://${domain}${path}`;

  it(`the "${headerName}" header should be present in the response [domain: ${domain}]`, () => {
    return chai.request(secureUri)
      .get(`/?bust=${Math.random()}`)
      .redirects(0)
      .then((res) => {
        res.should.have.header(headerName);
      });
  });
};

/**
 * Test that a response header is present and includes a substring.
 * @param {string} domain The domain to access.
 * @param {string} headerName The header name to check.
 * @param {string} headerValue The value to include.
 */
const testResponseHeaderValueIncludes = (domain, headerName, headerValue, path = '/') => {
  const secureUri = `https://${domain}${path}`;

  it(`the "${headerName}" response header should include "${headerValue}" [domain: ${domain}]`, () => {
    return chai.request(secureUri)
      .get(`/?bust=${Math.random()}`)
      .redirects(0)
      .then((res) => {
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
 */
const testResponseHeaderValueMatches = (domain, headerName, headerValue) => {
  const secureUri = `https://${domain}`;

  it(`the "${headerName}" response header should be set to "${headerValue}" [domain: ${domain}]`, () => {
    return chai.request(secureUri)
      .get(`/?bust=${Math.random()}`)
      .redirects(0)
      .then((res) => {
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
 * @param {string=,} splitOn The string to use when splitting the values.
 */
const testResponseHeaderValueCountIs = (domain, headerName, count, splitOn = ',') => {
  const secureUri = `https://${domain}`;

  it(`the "${headerName}" response header should contain ${count} values [domain: ${domain}]`, () => {
    return chai.request(secureUri)
      .get(`/?bust=${Math.random()}`)
      .redirects(0)
      .then((res) => {
        res.should.have.header(headerName);
        const actualCount = res.headers[headerName.toLowerCase()].split(splitOn).length;
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