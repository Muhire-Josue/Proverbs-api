import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../index';
import customMessage from '../../constants/customMessage';
import statusCode from '../../constants/statusCodes';
import userMoch from '../mochData/userMoch';
import proverbMoch from '../mochData/proverbMoch';

chai.use(chaiHttp);
chai.should();

const {
  USER_CREATED,
  PROVERB_SAVED,
  PROVERB_INVALID_VALUES,
  PROVERB_UPDATED,
  ALL_PROVERBS,
  DELETE_PROVERB
} = customMessage;
const { HTTP_OK, HTTP_BAD_REQUEST, HTTP_CREATED } = statusCode;

let proverbId;
let postedBy;

describe('User endpoint', () => {
  it('Should successfully create a user', (done) => {
    chai
      .request(server)
      .post('/user')
      .send(userMoch[0])
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(HTTP_OK);
        expect(message);
        expect(message).to.equal(USER_CREATED);
        done();
      });
  });
  it('Should successfully save a proverb', (done) => {
    chai
      .request(server)
      .post('/proverb/add')
      .send(proverbMoch[0])
      .end((err, res) => {
        const { message, data } = res.body;
        proverbId = data.id;
        postedBy = data.postedBy;

        expect(res.status).to.equal(HTTP_CREATED);
        expect(message);
        expect(data);
        expect(data).to.be.an('object');
        expect(message).to.equal(PROVERB_SAVED);
        done();
      });
  });

  it('Should not save a proverb with empty inputs', (done) => {
    chai
      .request(server)
      .post('/proverb/add')
      .send(proverbMoch[1])
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(HTTP_BAD_REQUEST);
        expect(error);
        expect(error).to.equal(PROVERB_INVALID_VALUES);
        done();
      });
  });
  it('Should update a proverb successfully', (done) => {
    chai
      .request(server)
      .put(`/proverb/edit/${proverbId}`)
      .send(proverbMoch[2])
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(HTTP_OK);
        expect(message);
        expect(message).to.equal(PROVERB_UPDATED);
        done();
      });
  });

  it('Should display all proverbs', (done) => {
    chai
      .request(server)
      .get('/proverbs')
      .end((err, res) => {
        const { message, data } = res.body;
        expect(res.status).to.equal(HTTP_OK);
        expect(message);
        expect(data);
        expect(data).to.be.an('array');
        expect(message).to.equal(ALL_PROVERBS);
        done();
      });
  });

  it('Should display all proverbs of a user', (done) => {
    chai
      .request(server)
      .get('/proverbs/mine')
      .end((err, res) => {
        const { message, data } = res.body;
        expect(res.status).to.equal(HTTP_OK);
        expect(message);
        expect(data);
        expect(data).to.be.an('array');
        expect(message).to.equal(ALL_PROVERBS);
        done();
      });
  });

  it('Should display all proverbs of a user via params', (done) => {
    chai
      .request(server)
      .get(`/proverbs/${postedBy}`)
      .end((err, res) => {
        const { message, data } = res.body;
        expect(res.status).to.equal(HTTP_OK);
        expect(message);
        expect(data);
        expect(data).to.be.an('array');
        expect(message).to.equal(ALL_PROVERBS);
        done();
      });
  });
  it('Should display a proverb by id', (done) => {
    chai
      .request(server)
      .get(`/proverb/${proverbId}`)
      .end((err, res) => {
        const { message, data } = res.body;
        expect(res.status).to.equal(HTTP_OK);
        expect(message);
        expect(data);
        expect(data).to.be.an('object');
        expect(message).to.equal(ALL_PROVERBS);
        done();
      });
  });
  it('Should delete a proverb by id', (done) => {
    chai
      .request(server)
      .delete(`/proverb/${proverbId}`)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(HTTP_OK);
        expect(message);
        expect(message).to.equal(DELETE_PROVERB);
        done();
      });
  });
});
