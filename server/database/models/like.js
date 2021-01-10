module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    proverbId: DataTypes.INTEGER,
    likedBy: DataTypes.STRING
  }, {});
  Like.associate = (models) => {
    // associations can be defined here
    Like.belongsTo(models.Proverb, {
      as: 'likes',
      foreignKey: 'proverbId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Like;
};
