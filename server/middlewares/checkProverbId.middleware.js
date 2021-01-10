import responseHandler from '../utils/responseHandler.util';
import statusCode from '../constants/statusCodes';
import customMessage from '../constants/customMessage';
import ProverbService from '../services/proverb.service';

const { findProverbById } = ProverbService;
const { PROVERB_NOT_FOUND } = customMessage;
const { HTTP_NOT_FOUND } = statusCode;
const { errorResponse } = responseHandler;

const checkProverbId = async (req, res, next) => {
  const { proverbId } = req.params;
  const proverb = await findProverbById(proverbId);
  if (!proverb) {
    return errorResponse(res, HTTP_NOT_FOUND, PROVERB_NOT_FOUND);
  }
  return next();
};
export default checkProverbId;
