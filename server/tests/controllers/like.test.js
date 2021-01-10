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
  PROVERB_LIKED
} = customMessage;
const { HTTP_OK, HTTP_BAD_REQUEST, HTTP_CREATED } = statusCode;

let proverbId;
let proverbId2;
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
  it('Should successfully like a proverb', (done) => {
    chai
      .request(server)
      .post('/proverb/like')
      .send({ proverbId })
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(HTTP_CREATED);
        expect(message);
        expect(message).to.equal(PROVERB_LIKED);
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
        proverbId2 = data.id;

        expect(res.status).to.equal(HTTP_CREATED);
        expect(message);
        expect(data);
        expect(data).to.be.an('object');
        expect(message).to.equal(PROVERB_SAVED);
        done();
      });
  });
  it('Should successfully like a proverb', (done) => {
    chai
      .request(server)
      .post('/proverb/like')
      .send({ proverbId2 })
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(HTTP_CREATED);
        expect(message);
        expect(message).to.equal(PROVERB_LIKED);
        done();
      });
  });
});
