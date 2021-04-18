module.exports = (sequelize, DataTypes) => {
  return sequelize.define('content', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    link: {
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
