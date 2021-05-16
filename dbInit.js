const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const adminCollection = require('./models/users')(sequelize, Sequelize.DataTypes);
const CurrencyShop = require('./models/CurrencyShop')(sequelize, Sequelize.DataTypes);
require('./models/UserItems')(sequelize, Sequelize.DataTypes);
require('./models/videoCollection')(sequelize, Sequelize.DataTypes);
require('./models/content')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({force}).then(async () =>{
	//create and populate the beginnings of the formal database
	const admins = [
		adminCollection.upsert({user_id:'279541141324562433', role_type:'owner'}), //martin
		adminCollection.upsert({user_id:'443042516963426306', role_type:'administrator'}), //zeke
		adminCollection.upsert({user_id:'201899016697413634', role_type:'administrator'}), //pickle
		adminCollection.upsert({user_id:'155397399345496064', role_type:'administrator'}) //quartz
	]
	await Promise.all(admins)
	const shop = [
		CurrencyShop.upsert({name: 'Seal of Mar', cost: 1})
	]
	await Promise.all(shop);
  console.log('The Precursors have harmonised their offerings (Database synced)');
  sequelize.close();
}).catch(console.error);
