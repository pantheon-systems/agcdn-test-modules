const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai/register-should');
chai.use(chaiHttp);

const redirectTest = require('../src/lib/redirect');

describe('Test the "redirect" methods', () => {
  describe('Test the "generic" method', () => {
    redirectTest.generic('agcdn-test-module.ps-pantheon.com', '/from-target', '/to-target');
  });

  describe('Test the "canonical" method', () => {
    redirectTest.canonical('canonical.agcdn-test-module.ps-pantheon.com', 'non-canonical.agcdn-test-module.ps-pantheon.com', 'canonical.agcdn-test-module.ps-pantheon.com');
  });
});
