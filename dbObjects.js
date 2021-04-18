const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite'
});

const Users = require('./models/users')(sequelize, Sequelize.DataTypes);
const Content = require('./models/content')(sequelize, Sequelize.DataTypes);
const VideoCollection = require('./models/content')(sequelize, Sequelize.DataTypes);

VideoCollection.belongsTo(Content, {foreignKey: 'video_id', as: "video"});

Users.prototype.addItem
