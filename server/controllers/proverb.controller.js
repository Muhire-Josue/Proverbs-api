import ProverbService from '../services/proverb.service';
import statusCode from '../constants/statusCodes';
import customMessage from '../constants/customMessage';
import responseHandler from '../utils/responseHandler.util';

const { saveProverb } = ProverbService;

const { HTTP_CREATED } = statusCode;
const { PROVERB_SAVED } = customMessage;
const { successResponse } = responseHandler;
/**
 * Proverb controller
 */
export default class ProverbController {
  /**
   * @description saves a proverb
   * @param {Request} req
   * @param {Response} res
   * @returns {object} it returns the saved proverb
   */
  static async createProverb(req, res) {
    const proverb = req.body;
    proverb.likes = 0;
    proverb.postedBy = req.session.username ? req.session.username : 'Anonymous';
    const createdProverb = await saveProverb(proverb);
    return successResponse(res, HTTP_CREATED, PROVERB_SAVED, createdProverb);
  }
}
