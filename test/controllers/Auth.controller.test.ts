import * as chai from 'chai';
import * as config from 'config';
import chaiHttp = require('chai-http');

import app from '../../src/App';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
let token:string;

describe('[authRoute]', () => {

  it('POST /login should return 400 if no valid body', done => {
    chai.request(app)
    .post('/auth/login')
    .end((err, res) => {
      expect(err.status).to.equal(400);
      done();
    });
  });

  it('POST /login should return 404 if no user found', done => {
    chai.request(app)
    .post('/auth/login')
    .send({ username: 'unknown', password:'whatever' })
    .end((err, res) => {
      expect(err.status).to.equal(404);
      done();
    });
  });

  it('POST /login should return 401 user found but bad password', done => {
    chai.request(app)
    .post('/auth/login')
    .send({ username: config.get('tests.auth.username'), password: 'badone' })
    .end((err, res) => {
      expect(err.status).to.equal(401);
      done();
    });
  });

  it('POST /login should return 200 and a nice token', done => {
    chai.request(app)
    .post('/auth/login')
    .send({ username: config.get('tests.auth.username'), password: config.get('tests.auth.password') })
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.datas).to.have.property('token');
      expect(res.body.datas.token).to.have.length.greaterThan(0);
      done();
    });
  });

  
  it('POST /register should return 200', done => {
    chai.request(app)
    .post('/auth/register')
    .send({ username: 'test_register', password: 'test_register', firstname: 'test_register', lastname: 'test_register' })
    .end((err, res) => {
      expect(res.status).to.equal(200);
      done();
    });
  });

});
