module.exports = (sequelize, DataTypes) => {
  return sequelize.define('users', {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    role_type: {
      type: DataTypes.STRING,
      defaultValue: 'Member',
      allowNull: false,
    },
  }, {
      timestamps: false
  });
};