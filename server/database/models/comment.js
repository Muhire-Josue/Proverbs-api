module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: DataTypes.STRING,
    proverbId: DataTypes.INTEGER,
    commentedBy: DataTypes.STRING
  }, {});
  Comment.associate = (models) => {
    // associations can be defined here
    Comment.belongsTo(models.Proverb, {
      as: 'comments',
      foreignKey: 'proverbId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Comment;
};
