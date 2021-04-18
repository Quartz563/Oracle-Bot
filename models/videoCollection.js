module.exports = (sequelize, DataTypes) => {
  return sequelize.define('video_collection',{
    user_id: DataTypes.STRING,
    video_id: DataTypes.STRING,
  }, {
    timestamps: false,
  });
};
