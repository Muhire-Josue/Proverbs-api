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
  EDIT_COMMENT_FAILED,
  INVALID_COMMENTID,
  COMMENT_NOT_FOUND
} = customMessage;
const {
  HTTP_OK,
  HTTP_UNAUTHORIZED,
  HTTP_CREATED,
  HTTP_NOT_FOUND,
  HTTP_BAD_REQUEST
} = statusCode;

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
      .post(`/proverb/${proverbId}/comment`)
      .send({ comment: 'umugani mwiza cyane' })
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
      .put(`/proverb/comment/edit/${commentId}`)
      .send({ comment: 'umugani mwiza cyane' })
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(HTTP_UNAUTHORIZED);
        expect(error);
        expect(error).to.equal(EDIT_COMMENT_FAILED);
        done();
      });
  });
  it('Should not edit a comment with an invalid commentId', (done) => {
    chai
      .request(server)
      .put('/proverb/comment/edit/abc')
      .send({ comment: 'umugani mwiza cyane' })
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(HTTP_BAD_REQUEST);
        expect(error);
        expect(error).to.equal(INVALID_COMMENTID);
        done();
      });
  });

  it('Should not edit a comment if comment is not found', (done) => {
    chai
      .request(server)
      .put('/proverb/comment/edit/0')
      .send({ comment: 'umugani mwiza cyane' })
      .end((err, res) => {
        const { error } = res.body;
        expect(res.status).to.equal(HTTP_NOT_FOUND);
        expect(error);
        expect(error).to.equal(COMMENT_NOT_FOUND);
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
