module.exports = (sequelize, DataTypes) => {
  const Proverb = sequelize.define('Proverb', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    postedBy: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {});
  Proverb.associate = (models) => {
    // associations can be defined here
  };
  return Proverb;
};
