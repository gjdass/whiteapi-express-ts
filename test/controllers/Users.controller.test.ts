import * as mocha from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as jwt from 'express-jwt';
import * as config from 'config';
import chaiHttp = require('chai-http');

import app from '../../src/App';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
let token:string;

describe('[usersRoute]', () => {

  before(done => {
    chai.request(app)
    .post('/auth/login')
    .send({
      username: config.get("tests.auth.username"),
      password: config.get("tests.auth.password")
    })
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.datas).to.have.property('token');
      token = res.body.datas.token;
      done();
    });
  });

  it('GET /users should return 401 if no valid token provided', done => {
    chai.request(app)
    .get('/api/v1/users')
    .end((err, res) => {
      expect(err.status).to.equal(401);
      done();
    })
  });

  it('GET /users should return 200 with JSON array containing 2 records', (done) => {
    chai.request(app)
    .get('/api/v1/users')
    .set('Authorization', token)
    .end((err, res) => {
      expect(res).to.be.json;
      expect(res.status).to.equal(200);
      expect(res.body.datas).to.be.an('array');
      done();
    });
  });

  it('GET /users/<user> should return 200 with a user object', (done) => {
    chai.request(app)
    .get('/api/v1/users/' + config.get('tests.auth.username'))
    .set('Authorization', token)
    .end((err, res) => {
      expect(res).to.be.json;
      expect(res.status).to.equal(200);
      expect(res.body.datas).to.be.an('object');
      expect(res.body.datas).to.have.property('username', config.get('tests.auth.username'));
      done();
    });
  });

});
