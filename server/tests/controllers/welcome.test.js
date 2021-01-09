import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../index';
import customMessage from '../../constants/customMessage';
import statusCode from '../../constants/statusCodes';

chai.use(chaiHttp);
chai.should();

const { welcomeMessage } = customMessage;
const { HTTP_OK } = statusCode;

describe('Welcome endpoint', () => {
  it('Should test welcome endpoint', (done) => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(HTTP_OK);
        expect(message);
        expect(message).to.be.a('string');
        expect(message).to.equal(welcomeMessage);
        done();
      });
  });
});
