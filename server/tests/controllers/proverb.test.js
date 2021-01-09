import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../index';
import customMessage from '../../constants/customMessage';
import statusCode from '../../constants/statusCodes';
import userMoch from '../mochData/userMoch';
import proverbMoch from '../mochData/proverbMoch';

chai.use(chaiHttp);
chai.should();

const { USER_CREATED, PROVERB_SAVED, PROVERB_INVALID_VALUES } = customMessage;
const { HTTP_OK, HTTP_BAD_REQUEST, HTTP_CREATED } = statusCode;

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
});
