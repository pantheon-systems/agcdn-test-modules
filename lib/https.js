import chai from 'chai'

/**
 * Tests that HTTP requests are redirected to HTTPS.
 * @param {string} domain The domain to test
 */
const testHttpToHttps = (domain) => {
  // Test case: requests to ${domain} via http are redirected to https.
  const insecureUri = `http://${domain}`
  const secureUri = `https://${domain}`
  
  it(`accessing the site using http should redirect to https [domain: ${domain}]`, () => {
    const cachebust = `/?bust=${Math.random()}`
    return chai.request(insecureUri)
      .get(cachebust)
      .redirects(0)
      .then((res) => {
        res.should.redirectTo(`${secureUri}${cachebust}`)
      })
  })
}

/**
 * Tests that an HSTS header is returned with the response.
 * @param {string} domain The domain to test
 * @param {string} expectedHeader The expected HSTS header
 */
const testHstsHeader = (domain, expectedHeader = null) => {
  // Test case: ${domain} returns an HSTS header.
  const secureUri = `https://${domain}`

  it(`it should contain an HSTS header [domain: ${domain}]`, () => {
    return chai.request(secureUri)
      .get(`/?bust=${Math.random()}`)
      .redirects(0)
      .then((res) => {
        res.should.have.header('strict-transport-security');
        if (expectedHeader) res.headers['strict-transport-security'].should.contain(expectedHeader)
      })
  })
}

export default {
  tls: testHttpToHttps,
  hsts: testHstsHeader
}