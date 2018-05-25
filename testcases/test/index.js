process.env.NODE_ENV = 'test';

//var chai = require('chai');
//var expect = chai.expect;
//let should = chai.should();
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../api/server');
let should = chai.should();
var expect = require('chai').expect;
chai.use(chaiHttp);

// GET List of events test
describe('/GET events', () => {
    it('it should GET all the events', (done) => {
      chai.request(server)
          .get('/ensevents')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(20);
            done();
          });
    });
});

//Post a specific event test
describe('/POST events', () => {
it('it should POST an Event ', (done) => {
    let event = {
        method:"AuctionStarted",
        utsts:((new Date()).toUTCString()),
        value:{
            hash:"0x10000600b4e2fd6367d251d3d799cf00a4771b3722a6717e9557d9541c34514d",
            registrationDate:"1527662357"
        }
    }

    chai.request(server)
        .post('/ensevents')
        .send(event)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('status').eql('ok');
          done();
        });
  });
});