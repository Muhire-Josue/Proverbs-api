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
}
