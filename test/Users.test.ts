import * as mocha from 'mocha';
import * as chai from 'chai';
import * as jwt from 'express-jwt';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
let token:string;

describe('usersRoute', () => {

  before(done => {
    chai.request(app)
    .post('/auth/login')
    .send({
      login: 'gjdass',
      password: 'gjdass'
    })
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.datas).to.have.property('token');
      token = res.body.datas.token;
      done();
    });
  });

  it('should return 401 if no valid token provided', done => {
    chai.request(app)
    .get('/api/v1/users')
    .end((err, res) => {
      expect(err.status).to.equal(401);
      done();
    })
  });

  it('getAll() should responds with JSON array', (done) => {
    chai.request(app)
    .get('/api/v1/users')
    .set('Authorization', token)
    .end((err, res) => {
      expect(res).to.be.json;
      expect(res.status).to.equal(200);
      done();
    });
  });

  it('getAll() should be array with 2 records', done => {
    chai.request(app)
    .get('/api/v1/users')
    .set('Authorization', token)
    .then(res => {
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.length(2);
      for (let i = 0; i < 2; i++) {
        res.body[i].should.have.property('login');
        res.body[i].should.have.property('firstname');
        res.body[i].should.have.property('lastname');
      }
      done();
    }, err => done(err));
  });

});
