const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai/register-should');
chai.use(chaiHttp);

const httpsTest = require('../src/lib/https');

describe('Test the "https" methods', () => {
  describe('Test the "tls" method', () => {
    httpsTest.tls('agcdn-test-module.ps-pantheon.com');
  });

  describe('Test the "hsts" method', () => {
    httpsTest.hsts('agcdn-test-module.ps-pantheon.com');
  });
});
