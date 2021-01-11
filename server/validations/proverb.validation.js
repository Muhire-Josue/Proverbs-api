import statusCode from '../constants/statusCodes';
import customMessage from '../constants/customMessage';
import responseHandler from '../utils/responseHandler.util';

const { errorResponse } = responseHandler;
const { PROVERB_INVALID_VALUES, INVALID_PROVERBID } = customMessage;
const { HTTP_BAD_REQUEST } = statusCode;

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @returns {object} it returns en error message if the inputs are empty
 */
const proverbInputValidation = (req, res, next) => {
  const { title, description } = req.body;
  if (title.length === 0 || description.length === 0) {
    return errorResponse(res, HTTP_BAD_REQUEST, PROVERB_INVALID_VALUES);
  }
  return next();
};

export default proverbInputValidation;
