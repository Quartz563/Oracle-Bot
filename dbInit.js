const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const videoCollection = require('./models/content')(sequelize, Sequelize.DataTypes);
require('./models/users')(sequelize, Sequelize.DataTypes);
require('./models/videoCollection')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({force}).then(async () =>{
  const videos = [
    videoCollection.upsert({name:'test', link: 'https://www.youtube.com/watch?v=miJSWExpRCA', particpiant: "Powercell_Zeke"})
  ];
  await Promise.all(videos);
  console.log('The Precursors have harmonised their offerings (Database synced)');
  sequelize.close();
}).catch(console.error);
