module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
  }, {});
  Comment.associate = (models) => {
    Comment.belongsTo(models.User);
  };
  return Comment;
};
