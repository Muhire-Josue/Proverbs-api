import models from '../database/models/index';

const { Like } = models;
/**
 * @description Like services
 */
export default class LikeService {
  /**
   * @description saves a like
   * @param {object} like
   * @returns {object} it returns the saved object
   */
  static async saveLike(like) {
    const savedLike = await Like.create(like);
    return savedLike;
  }

  /**
   * @description find like based on proverbId and likedBy
   * @param {integer} proverbId
   * @param {string} likedBy
   * @returns {object} it returns the object if found
   */
  static async findLikeByProverbIdAndlikedBy(proverbId, likedBy) {
    const like = await Like.findOne({ where: { proverbId, likedBy } });
    return like;
  }

  /**
   * @description delete a like
   * @param {integer} proverbId
   * @param {string} likedBy
   * @returns {null} it returns void
   */
  static async deleteLike(proverbId, likedBy) {
    await Like.destroy({ where: { proverbId, likedBy } });
  }
}
