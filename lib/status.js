import chai from 'chai';

/**
 * Tests that requests to a path have a status.
 * @param {string} domain The domain to test
 * @param {string} path The path to test
 * @param {integer} status The status to test
 */
const testPathStatusIs = ({domain, path = '/', status = 200}) => {
  const secureUri = `https://${domain}`;

  it(`accessing path "${path}" should result in a status of "${status}"`, () => {
    const bust = `${path}?bust=${Math.random()}`;
    return chai.request(secureUri)
      .get(bust)
      .redirects(0)
      .then(res => {
        res.should.have.status(status);
      });
  });
};

/**
 * Test that a request returns a 403.
 * @param {string} domain The domain to test
 * @param {string} path The path to test
 */
const testPathIsBlocked = ({domain, path = '/'}) => {
  return testPathStatusIs({domain, path, status: 403});
};

/**
 * Test that a request returns a 200.
 * @param {string} domain The domain to test
 * @param {string} path The path to test
 */
const testPathIsOk = ({domain, path = '/'}) => {
  return testPathStatusIs({domain, path, status: 200});
};

/**
 * Test that a request returns a 404.
 * @param {string} domain The domain to test
 * @param {string} path The path to test
 */
const testPathIsNotFound = ({domain, path = '/'}) => {
  return testPathStatusIs({domain, path, status: 404});
};

module.exports = {
  statusIs: testPathStatusIs,
  blocked: testPathIsBlocked,
  ok: testPathIsOk,
  notFound: testPathIsNotFound
};