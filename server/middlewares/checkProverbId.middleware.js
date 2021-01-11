import responseHandler from '../utils/responseHandler.util';
import statusCode from '../constants/statusCodes';
import customMessage from '../constants/customMessage';
import ProverbService from '../services/proverb.service';

const { findProverbById } = ProverbService;
const { PROVERB_NOT_FOUND, INVALID_PROVERBID } = customMessage;
const { HTTP_NOT_FOUND, HTTP_BAD_REQUEST } = statusCode;
const { errorResponse } = responseHandler;

export const checkProverbExist = async (req, res, next) => {
  const { proverbId } = req.params;
  const proverb = await findProverbById(proverbId);
  if (!proverb) {
    return errorResponse(res, HTTP_NOT_FOUND, PROVERB_NOT_FOUND);
  }
  return next();
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @returns {object} it returns en error message if the proverbId is not an integer
 */
export const proverbIdValidation = (req, res, next) => {
  const { proverbId } = req.params;
  if (!Number.isInteger(parseInt(proverbId, 10))) {
    return errorResponse(res, HTTP_BAD_REQUEST, INVALID_PROVERBID);
  }
  return next();
};
