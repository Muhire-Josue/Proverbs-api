import models from '../database/models/index';

const { Comment } = models;
/**
 * @description Comment Service
 */
export default class CommentService {
  /**
   * @description it saves a comment
   * @param {object} comment
   * @returns {object} it returns the saved comment
   */
  static async saveComment(comment) {
    const savedComment = await Comment.create(comment);
    return savedComment;
  }

  /**
   *
   * @param {integer} id commentId
   * @param {string} commentedBy comment author
   * @param {object} data
   * @returns {null} it returns nothing
   */
  static async updateComment(id, commentedBy, data) {
    await Comment.update({ comment: data }, { where: { id, commentedBy } });
  }

  /**
   *
   * @param {integer} id commentId
   * @param {string} commentedBy comment author
   * @returns {null} it returns nothing
   */
  static async deleteComment(id, commentedBy) {
    await Comment.destroy({ where: { id, commentedBy } });
  }

  /**
   * @description finds and returns a comment
   * @param {integer} id
   * @returns {object} it returns a comment from the db
   */
  static async findCommentById(id) {
    const comment = await Comment.findOne({ where: { id } });
    return comment;
  }
}
