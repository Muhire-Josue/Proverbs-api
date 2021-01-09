import ProverbService from '../services/proverb.service';
import statusCode from '../constants/statusCodes';
import customMessage from '../constants/customMessage';
import responseHandler from '../utils/responseHandler.util';

const { saveProverb, updateProverb } = ProverbService;

const { HTTP_CREATED, HTTP_OK } = statusCode;
const { PROVERB_SAVED, PROVERB_UPDATED } = customMessage;
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

  /**
   * @description updates a proverb
   * @param {Request} req
   * @param {Response} res
   * @returns {object} it returns the updated proverb
   */
  static async editProverb(req, res) {
    const { id } = req.params;
    const proverb = req.body;
    const updatedProverb = await updateProverb(proverb, id);
    return successResponse(res, HTTP_OK, PROVERB_UPDATED, updatedProverb);
  }
}
