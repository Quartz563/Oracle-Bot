const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const videoCollection = require('./models/content')(sequelize, Sequelize.DataTypes);
const adminCollection = require('./models/users')(sequelize, Sequelize.DataTypes);
require('./models/videoCollection')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({force}).then(async () =>{
  const videos = [
    videoCollection.upsert({name:'test', link: 'https://www.youtube.com/watch?v=miJSWExpRCA', particpiant: "Powercell_Zeke"}) //creatre a test video
  ];
  await Promise.all(videos);
	//create and populate the beginnings of the formal database
	const admins = [
		adminCollection.upsert({user_id:'279541141324562433', role:'administrator'}), //martin
		adminCollection.upsert({user_id:'443042516963426306', role:'administrator'}), //zeke
		adminCollection.upsert({user_id:'201899016697413634', role:'administrator'}), //pickle
		adminCollection.upsert({user_id:'155397399345496064', role:'administrator'}) //quartz
	]
	await Promise.all(admins)
  console.log('The Precursors have harmonised their offerings (Database synced)');
  sequelize.close();
}).catch(console.error);
