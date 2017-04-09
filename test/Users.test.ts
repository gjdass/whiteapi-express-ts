import { Promise } from 'es6-promise';
import * as mocha from 'mocha';
import * as chai from 'chai';
import * as jwt from 'express-jwt';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();

describe('usersRoute', () => {

  beforeEach(done => {
    done();
  });

  afterEach(done => {
    done();
  });

  it('responds with JSON array', done => {
    return chai.request(app).get('/api/v1/users')
    .then(res => {
      expect(res).to.be.json;
      expect(res.status).to.equal(200);
      done();
    }, err => {
      done(err);
    });
  });

  it('should be array with 2 records', done => {
    return chai.request(app).get('/api/v1/users')
    .then(res => {
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.length(2);
      for (let i = 0; i < 2; i++) {
        res.body[i].should.have.property('login');
        res.body[i].should.have.property('firstname');
        res.body[i].should.have.property('lastname');
      }
      done();
    }, err => {
      done(err);
    });
  });

});
