const chai = require('chai');

class GenericRedirectTest {
  constructor(domain, redirFrom, redirTo) {
    this._secureUri = `https://${domain}`;
    this._resultDomain = this._secureUri;
    this._from = redirFrom;
    this._to = redirTo;
    this._hostHeaders = {};
    this._testTitle = `browsing to "${redirFrom}" should redirect to "${redirTo}" [domain: ${domain}]`;
  }

  test() {
    let prefix = '?';
    if (this._from.indexOf('?') !== -1) {
      prefix = '&';
    }
    const cachebust = `${prefix}bust=${Math.random()}`;
    it(this._testTitle, () => {
      let req = chai.request(this._secureUri).get(`${this._from}${cachebust}`).redirects(0);
      if (! (Object.keys(this._hostHeaders).length === 0 && this._hostHeaders.constructor === Object)) {
        req.set(this._hostHeaders);
      }
      return req.then((res) => {
        res.should.redirectTo(`${this._resultDomain}${this._to}${cachebust}`);
      });
    });
  }
}

class CanonicalRedirectTest extends GenericRedirectTest {
  constructor(domain, canonicalFrom, canonicalTo) {
    super(domain, '/', '/');
    this._resultDomain = `https://${canonicalTo}`;
    this._domainFrom = canonicalFrom;
    this._domainTo = canonicalTo;
    if (process.env.NODE_ENV == 'test') {
      this._hostHeaders = { 'override-host': canonicalFrom };
    } else {
      this._hostHeaders = { 'Host': canonicalFrom };
    }
    this._testTitle = `browsing to "${canonicalFrom}" should redirect to "${canonicalTo}"`;
  }
}

module.exports = {
  generic: (domain, redirFrom, redirTo) => {
    const testClass = new GenericRedirectTest(domain, redirFrom, redirTo);
    testClass.test();
  },
  canonical: (domain, canonicalFrom, canonicalTo) => {
    const testClass = new CanonicalRedirectTest(domain, canonicalFrom, canonicalTo);
    testClass.test();
  },
  vanity: (vanityDomain, resultDomain, resultPath) => {
    let prefix = '?';
    if (resultPath.indexOf('?') !== -1) {
      prefix = '&';
    }
    const cacheBust = `${prefix}bust=${Math.random()}`;
    it(`browsing to "${vanityDomain}" should redirect to "https://${resultDomain}${resultPath}" [domain: ${vanityDomain}]`, () => {
      let req = chai.request(`https://${vanityDomain}`).get(`/${cacheBust}`).redirects(0);
      return req.then((res) => {
        res.should.redirectTo(`https://${resultDomain}${resultPath}${cacheBust}`);
      });
    });
  }
};