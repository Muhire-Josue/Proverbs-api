import responseHandler from '../utils/responseHandler.util';
import statusCode from '../constants/statusCodes';
import customMessage from '../constants/customMessage';
import CommentService from '../services/comment.service';

const { saveComment, updateComment, deleteComment } = CommentService;
const { HTTP_CREATED, HTTP_OK, HTTP_UNAUTHORIZED } = statusCode;
const {
  COMMENT_SAVED,
  EDIT_COMMENT_FAILED,
  COMMENT_EDITED,
  COMMENT_DELETED
} = customMessage;
const { successResponse, updatedResponse, errorResponse } = responseHandler;

/**
 * @description Comment Controller
 */
export default class CommentController {
  /**
   * @description Comment a proverb
   * @param {Request} req
   * @param {Response} res
   * @returns {object} it returns the comments submitted
   */
  static async CommentProverb(req, res) {
    const { comment } = req.body;
    const { proverbId } = req.params;
    const commentedBy = req.session.username ? req.session.username : 'Anonymous';
    const proverbComment = { comment, proverbId, commentedBy };
    const savedComment = await saveComment(proverbComment);
    return successResponse(res, HTTP_CREATED, COMMENT_SAVED, savedComment);
  }

  /**
   * @description edit a comment
   * @param {Request} req
   * @param {Response} res
   * @returns {object} it returns a success message
   */
  static async editComment(req, res) {
    const { comment } = req.body;
    const { commentId } = req.params;
    const commentedBy = req.session.username;
    if (!commentedBy) {
      return errorResponse(res, HTTP_UNAUTHORIZED, EDIT_COMMENT_FAILED);
    }
    await updateComment(commentId, commentedBy, comment);
    return updatedResponse(res, HTTP_OK, COMMENT_EDITED);
  }

  /**
   * @description edit a comment
   * @param {Request} req
   * @param {Response} res
   * @returns {object} it returns a success message
   */
  static async removeComment(req, res) {
    const { commentId } = req.params;
    const commentedBy = req.session.username;
    if (!commentedBy) {
      return errorResponse(res, HTTP_UNAUTHORIZED, EDIT_COMMENT_FAILED);
    }
    await deleteComment(commentId, commentedBy);
    return updatedResponse(res, HTTP_OK, COMMENT_DELETED);
  }
}
