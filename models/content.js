module.exports = (sequelize, DataTypes) => {
  return sequelize.define('content', {
    video_label: {
      type: DataTypes.STRING,
      unique: true,
    },
    video_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    particpiant: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
};
