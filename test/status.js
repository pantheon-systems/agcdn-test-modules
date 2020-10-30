const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai/register-should');
chai.use(chaiHttp);

const statusTest = require('../src/lib/status');

describe('Test the "status" methods', () => {
  describe('Test the "statusIs" method', () => {
    statusTest.statusIs({
      domain: 'httpbin.org',
      path: '/status/299',
      status: 299,
    });
  });

  describe('Test the "blocked" method', () => {
    statusTest.blocked({
      domain: 'httpbin.org',
      path: '/status/403',
    });
  });

  describe('Test the "ok" method', () => {
    statusTest.ok({
      domain: 'httpbin.org',
      path: '/status/200',
    });
  });

  describe('Test the "notFound" method', () => {
    statusTest.notFound({
      domain: 'httpbin.org',
      path: '/status/404',
    });
  });
});
