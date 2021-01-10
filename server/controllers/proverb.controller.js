import ProverbService from '../services/proverb.service';
import statusCode from '../constants/statusCodes';
import customMessage from '../constants/customMessage';
import responseHandler from '../utils/responseHandler.util';
import countLikesInArrayOfProverbs from '../utils/countLikes.util';

const {
  saveProverb,
  updateProverb,
  findAllProverbs,
  findProverbById,
  deleteProverbById
} = ProverbService;

const { HTTP_CREATED, HTTP_OK } = statusCode;
const {
  PROVERB_SAVED, PROVERB_UPDATED, ALL_PROVERBS, DELETE_PROVERB
} = customMessage;
const { successResponse, updatedResponse } = responseHandler;

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
    await updateProverb(proverb, id);
    return updatedResponse(res, HTTP_OK, PROVERB_UPDATED);
  }

  /**
   * @description find all proverbs
   * @param {Request} req
   * @param {Response} res
   * @returns {object} it returns tall proverbs
   */
  static async getAllProverbs(req, res) {
    const proverbs = await findAllProverbs();
    const proverbsWithNumberOfLikes = countLikesInArrayOfProverbs(proverbs);
    return successResponse(res, HTTP_OK, ALL_PROVERBS, proverbsWithNumberOfLikes);
  }

  /**
   * @description find all proverbs
   * @param {Request} req
   * @param {Response} res
   * @returns {object} it returns tall proverbs
   */
  static async getAllProverbsByPostedBy(req, res) {
    const postedBy = req.session.username ? req.session.username : 'Anonymous';
    const proverbs = await findAllProverbs(postedBy);
    const proverbsWithNumberOfLikes = countLikesInArrayOfProverbs(proverbs);
    return successResponse(res, HTTP_OK, ALL_PROVERBS, proverbsWithNumberOfLikes);
  }

  /**
   * @description find all proverbs
   * @param {Request} req
   * @param {Response} res
   * @returns {object} it returns all proverbs
   */
  static async getAllProverbsByUser(req, res) {
    const { postedBy } = req.params;
    const proverbs = await findAllProverbs(postedBy);
    return successResponse(res, HTTP_OK, ALL_PROVERBS, proverbs);
  }

  /**
   * @description find proverb by id
   * @param {Request} req
   * @param {Response} res
   * @returns {object} it returns a proverb
   */
  static async getProverbById(req, res) {
    const { proverbId } = req.params;
    const proverb = await findProverbById(proverbId);
    return successResponse(res, HTTP_OK, ALL_PROVERBS, proverb);
  }

  /**
   * @description deletes a proverb by id
   * @param {Request} req
   * @param {Response} res
   * @returns {object} it returns a success message
   */
  static async deleteProverb(req, res) {
    const { proverbId } = req.params;
    await deleteProverbById(proverbId);
    return updatedResponse(res, HTTP_OK, DELETE_PROVERB);
  }
}
