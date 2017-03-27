import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();

describe('usersRoute', () => {

  it('responds with JSON array', () => {
    return chai.request(app).get('/api/v1/users')
    .then(res => {
      expect(res).to.be.json;
      expect(res.status).to.equal(200);
    });
  });

  it('should be array with 2 records', () => {
    return chai.request(app).get('/api/v1/users')
    .then(res => {
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.length(2);
      for (let i = 0; i < 2; i++) {
        res.body[i].should.have.property('login');
        res.body[i].should.have.property('firstname');
        res.body[i].should.have.property('lastname');
      }
    });
  });

});
