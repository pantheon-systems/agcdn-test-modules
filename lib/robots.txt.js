const chai = require('chai');
const readFileSync = require('fs').readFileSync;

const platformRobots = readFileSync('./pantheon_robots.txt').toString();
const url = `/robots.txt?bust=${Math.random()}`;

/**
 * Test that robots.txt returns a 200 status code.
 * @param {string} domain The domain to access.
 */
const testHttpOk = (domain) => {
  const secureUri = `https://${domain}`;
  
  it(`it should have a return status of 200 [domain: ${domain}]`, () => {
    return chai.request(secureUri)
      .get(url)
      .redirects(0)
      .then((res) => {
        res.should.have.status(200);
      });
  });
};

/**
 * Test that robots.txt matches the platform version.
 * @param {string} domain The domain to access.
 */
const testPlatformRobots = (domain) => {
  const secureUri = `https://${domain}`;

  it(`it should match the platform version [domain: ${domain}]`, () => {
    return chai.request(secureUri)
      .get(url)
      .redirects(0)
      .then((res) => {
        res.text.should.be.equalIgnoreCase(platformRobots);
      });
  });
};

/**
 * Test that robots.txt matches some arbitrary string.
 * @param {string} domain The domain to access.
 * @param {string} expected The expected contents of robots.txt.
 */
const testLiveRobots = (domain, expected) => {
  const secureUri = `https://${domain}`;

  it(`it should match the config version [domain: ${domain}]`, () => {
    return chai.request(secureUri)
      .get(url)
      .redirects(0)
      .then((res) => {
        const actual = res.text.trimRight();
        actual.should.be.equalIgnoreCase(expected);
      });
  });
};

module.exports = {
  httpOk: testHttpOk,
  platformRobots: testPlatformRobots,
  liveRobots: testLiveRobots
};