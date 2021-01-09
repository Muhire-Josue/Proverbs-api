import responseHandler from '../utils/responseHandler.util';
import statusCode from '../constants/statusCodes';
import customMessage from '../constants/customMessage';

const { successResponse } = responseHandler;
const { HTTP_OK } = statusCode;
const { USER_CREATED } = customMessage;

/**
 * @description this controller deals with user's releated features
 */
export default class UserController {
  /**
   * @description creates a temporal username
   * @param {Request} req
   * @param {Response} res
   * @returns {object} it returns a success message
   */
  static createUser(req, res) {
    const { name } = req.body;
    req.session.username = name;
    return successResponse(res, HTTP_OK, USER_CREATED, undefined);
  }
}
