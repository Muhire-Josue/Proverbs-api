module.exports = (sequelize, DataTypes) => {
  const Proverb = sequelize.define('Proverb', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    postedBy: DataTypes.STRING,
  }, {});
  Proverb.associate = (models) => {
    // associations can be defined here
    Proverb.hasMany(models.Like, {
      as: 'likes',
      foreignKey: 'proverbId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    Proverb.hasMany(models.Comment, {
      as: 'comments',
      foreignKey: 'proverbId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Proverb;
};
