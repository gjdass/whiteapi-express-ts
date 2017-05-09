import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('[baseRoute]', () => {

  it('should be json', done => {
    chai.request(app)
    .get('/')
    .end((err, res) => {
      expect(res.type).to.eql('application/json');
      done();
    });
  });

  it('should have a message prop', done => {
    chai.request(app)
    .get('/')
    .end((err, res) => {
      expect(res.body.message).to.eql('Hello World!');
      done();
    });
  });

  it('should respond with error 404', done => {
    chai.request(app)
    .get('/unknownRoute')
    .end((err, res) => {
      expect(err.status).to.be.equal(404);
      done();
    });
  });

});