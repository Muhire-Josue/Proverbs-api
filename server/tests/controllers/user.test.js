import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../index';
import customMessage from '../../constants/customMessage';
import statusCode from '../../constants/statusCodes';
import userMoch from '../mochData/userMoch';

chai.use(chaiHttp);
chai.should();

const { USER_CREATED, INVALID_USERNAME } = customMessage;
const { HTTP_OK, HTTP_BAD_REQUEST } = statusCode;

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

  it('Should not create a user if the name is not a string', (done) => {
    chai
      .request(server)
      .post('/user')
      .send(userMoch[1])
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(HTTP_BAD_REQUEST);
        expect(error);
        expect(error).to.equal(INVALID_USERNAME);
        done();
      });
  });

  it('Should not create a user if the name is not a string', (done) => {
    chai
      .request(server)
      .post('/user')
      .send(userMoch[2])
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(HTTP_BAD_REQUEST);
        expect(error);
        expect(error).to.equal(INVALID_USERNAME);
        done();
      });
  });
  it('Should not create a user if the name is not a string', (done) => {
    chai
      .request(server)
      .post('/user')
      .send(userMoch[3])
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(HTTP_BAD_REQUEST);
        expect(error);
        expect(error).to.equal(INVALID_USERNAME);
        done();
      });
  });
});
