module.exports = (sequelize, DataTypes) => {
  return sequelize.define('users', {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    role_type: {
      type: DataTypes.STRING,
      defaultValue: 'member',
      allowNull: false,
    },
    orb_balance: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    PC_balance: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: 0,
    }
  }, {
      timestamps: false
  });
};
