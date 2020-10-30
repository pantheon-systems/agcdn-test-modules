const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai/register-should');
chai.use(chaiHttp);

const responseHeaderTest = require('../src/lib/responseHeader');

describe('Test the "responseHeader" methods', () => {
  describe('Test the "exists" method', () => {
    responseHeaderTest.exists('httpbin.org', 'well-known-test', '/response-headers?well-known-test=asdf');
  });

  describe('Test the "includes" method', () => {
    responseHeaderTest.includes('httpbin.org', 'well-known-test', 'asdf', '/response-headers?well-known-test=qwertasdfuiop');
  });

  describe('Test the "equals" method', () => {
    responseHeaderTest.equals('httpbin.org', 'well-known-test', 'qwertasdfuiop', '/response-headers?well-known-test=qwertasdfuiop');
  });

  describe('Test the "countEquals" method', () => {
    responseHeaderTest.countEquals('httpbin.org', 'well-known-test', 2, ',', `/response-headers?well-known-test=${encodeURIComponent('foo,bar')}`);
  });
});