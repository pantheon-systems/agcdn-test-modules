const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiString = require('chai-string');
const should = require('chai/register-should');
chai.use(chaiHttp);
chai.use(chaiString);

const robotsTest = require('../src/lib/robots.txt.js');

describe('Test the "robots.txt" methods', () => {
  describe('Test the "httpOk" method', () => {
    robotsTest.httpOk('agcdn-test-module.ps-pantheon.com');
  });
  
  describe('Test the "platformRobots" method', () => {
    robotsTest.platformRobots('agcdn-test-module.ps-pantheon.com');
  });
  
  describe('Test the "liveRobots" method', () => {
    robotsTest.liveRobots('canonical.agcdn-test-module.ps-pantheon.com', `User-agent: *
Disallow: /`);
  });
})