import models from '../database/models/index';

const { Proverb } = models;
/**
 * @description Proverb services
 */
export default class ProverbService {
  /**
   * @description save a proverb in the db
   * @param {object} proverb
   * @returns {object} it returns the saved proverb
   */
  static async saveProverb(proverb) {
    const savedProverb = await Proverb.create(proverb);
    return savedProverb;
  }

  /**
   * @description update a proverb in the db
   * @param {integer} data
   * @param {integer} id id of a proverb
   * @returns {null} it returns null
   */
  static async updateProverb(data, id) {
    await Proverb.update(data, { where: { id } });
  }

  /**
   * @description find all proverbs in the db
   * @param {string} postedBy
   * @returns {null} it returns all proverbs from the db
   */
  static async findAllProverbs(postedBy) {
    let proverbs;
    if (!postedBy || postedBy === undefined) {
      proverbs = await Proverb.findAll();
    } else {
      proverbs = await Proverb.findAll({ where: { postedBy } });
    }
    return proverbs;
  }

  /**
   * @description find all proverbs in the db
   * @param {integer} id
   * @returns {object} it returns a proverb
   */
  static async findProverbById(id) {
    const proverb = await Proverb.findOne({ where: { id } });
    return proverb;
  }

  /**
   * @description delete a proverb
   * @param {integer} id
   * @returns {null} it returns nothing
   */
  static async deleteProverbById(id) {
    await Proverb.destroy({ where: { id } });
  }
}
