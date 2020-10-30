const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai/register-should');
chai.use(chaiHttp);

const requestHeaderTest = require('../src/lib/requestHeader');

describe('Test the "requestHeader" methods', () => {
  describe('Test the "exists" method', () => {
    requestHeaderTest.exists({
      domain: 'httpbin.org',
      headerName: 'well-known-test',
      path: '/response-headers?well-known-test=asdf'
    });
  });
  
  describe('Test the "includes" method', () => {
    requestHeaderTest.includes({
      domain: 'httpbin.org',
      headerName: 'well-known-test',
      headerValue: 'asdf',
      path: '/response-headers?well-known-test=qwertasdfuiop'
    });
  });
  
  describe('Test the "equals" method', () => {
    requestHeaderTest.includes({
      domain: 'httpbin.org',
      headerName: 'well-known-test',
      headerValue: 'qwertasdfuiop',
      path: '/response-headers?well-known-test=qwertasdfuiop'
    });
  });
});
