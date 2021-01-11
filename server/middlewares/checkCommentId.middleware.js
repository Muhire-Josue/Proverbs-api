import responseHandler from '../utils/responseHandler.util';
import customMessage from '../constants/customMessage';
import statusCode from '../constants/statusCodes';
import CommentService from '../services/comment.service';

const { errorResponse } = responseHandler;
const { INVALID_COMMENTID, COMMENT_NOT_FOUND } = customMessage;
const { HTTP_BAD_REQUEST, HTTP_NOT_FOUND } = statusCode;
const { findCommentById } = CommentService;

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @returns {object} it returns an error message if the commentId isn't an integer
 */
export const validateCommentId = async (req, res, next) => {
  const { commentId } = req.params;
  if (Number.isInteger(parseInt(commentId, 10))) {
    return errorResponse(res, HTTP_BAD_REQUEST, INVALID_COMMENTID);
  }
  return next();
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @returns {object} it returns an error message if the comment is not found
 */
export const checkCommentExist = async (req, res, next) => {

  const { commentId } = req.params;
  const comment = await findCommentById(commentId);
  if (!comment) {
    return errorResponse(res, HTTP_NOT_FOUND, COMMENT_NOT_FOUND);
  }
  return next();
};
