/**
 * @description counts number of likes in an array of proverbs
 * @param {array} proverbs
 * @returns {array} it returns a new array of proverbs with number of like as a property
 */
const countLikesInArrayOfProverbs = (proverbs) => {
  const newProverbs = [];
  for (let i = 0; i < proverbs.length; i++) {
    proverbs[i].dataValues.numberOfLikes = proverbs[i].dataValues.likes.length;
    newProverbs.push(proverbs[i].dataValues);
  }
  return newProverbs;
};
export default countLikesInArrayOfProverbs;
