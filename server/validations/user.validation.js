import statusCode from '../constants/statusCodes';
import customMessage from '../constants/customMessage';
import responseHandler from '../utils/responseHandler.util';

const { errorResponse } = responseHandler;
const { HTTP_BAD_REQUEST } = statusCode;
const { INVALID_USERNAME } = customMessage;
/**
 * @description validates username
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @returns {object} it returns an error if the username is invalid
 */
const usernameValidation = (req, res, next) => {
  const { name } = req.body;
  if (typeof name !== 'string' || name.length < 3 || !name) {
    return errorResponse(res, HTTP_BAD_REQUEST, INVALID_USERNAME);
  }
  return next();
};
export default usernameValidation;
