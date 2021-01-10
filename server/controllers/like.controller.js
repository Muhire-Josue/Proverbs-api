import statusCode from '../constants/statusCodes';
import customMessage from '../constants/customMessage';
import responseHandler from '../utils/responseHandler.util';
import LikeService from '../services/like.service';

const { HTTP_CREATED } = statusCode;
const { PROVERB_LIKED } = customMessage;
const { updatedResponse } = responseHandler;

const { saveLike, findLikeByProverbIdAndlikedBy, deleteLike } = LikeService;
/**
 * @description Like controller
 */
export default class LikeController {
  /**
   * @description like and unlike a proverb
   * @param {Request} req
   * @param {Response} res
   * @returns {object} it returns a result from the db
   */
  static async likeProverb(req, res) {
    const { proverbId } = req.body;
    const likedBy = req.session.username ? req.session.username : 'Anonymous';
    if (req.session.username) {
      const like = await findLikeByProverbIdAndlikedBy(proverbId, req.session.username);
      if (like) {
        await deleteLike(proverbId, req.session.username);
        return updatedResponse(res, HTTP_CREATED, PROVERB_LIKED);
      }
    }
    const like = { proverbId, likedBy };
    await saveLike(like);
    return updatedResponse(res, HTTP_CREATED, PROVERB_LIKED);
  }
}
