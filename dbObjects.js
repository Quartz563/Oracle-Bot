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
const CurrencyShop = require('./models/CurrencyShop')(sequelize, Sequelize.DataTypes);
const UserItems = require('./models/UserItems')(sequelize, Sequelize.DataTypes);

VideoCollection.belongsTo(Content, {foreignKey: 'video_label', as: 'video_id'});

//todo create catchment for powercell items
Users.prototype.addItem = async function(item){
  const UserItem = await UserItems.findOne({
    where: {user_id: this.user_id, item_id: item.id},
  });
  if(userItem) {
    userItem.amount += 1;
    return userItem.save();
  }
  return UserItems.create({user_id: this.user_id, item_id: item.id, amount: 1});
}

Users.prototype.getItems = function() {
  return UserItems.findAll({
    where: {user_id: this.user_id},
    include: ['item'],
  });
}


module.exports = { Users, Content, VideoCollection, CurrencyShop, UserItems };
