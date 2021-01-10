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
  COMMENT_SAVED,
  COMMENT_EDITED,
  COMMENT_DELETED,
  EDIT_COMMENT_FAILED
} = customMessage;
const { HTTP_OK, HTTP_UNAUTHORIZED, HTTP_CREATED } = statusCode;

let proverbId;
let proverbId2;
let postedBy;
let commentId;

describe('comment tests', () => {
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
  it('Should successfully comment a proverb', (done) => {
    chai
      .request(server)
      .post('/proverb/comment')
      .send({ comment: 'umugani mwiza cyane', proverbId })
      .end((err, res) => {
        const { message, data } = res.body;
        commentId = data.id;
        postedBy = data.postedBy;

        expect(res.status).to.equal(HTTP_CREATED);
        expect(message);
        expect(data);
        expect(data).to.be.an('object');
        expect(message).to.equal(COMMENT_SAVED);
        done();
      });
  });
  it('Should not edit a comment', (done) => {
    chai
      .request(server)
      .put('/proverb/comment/edit')
      .send({ comment: 'umugani mwiza cyane', commentId })
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(HTTP_UNAUTHORIZED);
        expect(error);
        expect(error).to.equal(EDIT_COMMENT_FAILED);
        done();
      });
  });
  it('Should not delete a comment', (done) => {
    chai
      .request(server)
      .delete(`/proverb/comment/delete/${commentId}`)
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(HTTP_UNAUTHORIZED);
        expect(error);
        expect(error).to.equal(EDIT_COMMENT_FAILED);
        done();
      });
  });
});
