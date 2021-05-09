require('dotenv').config();
const chalk = require('chalk');
const fs = require('fs');
const config = require("./config.json");
const Discord = require('discord.js');
const oracle = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const memberCollection = new Discord.Collection();
const { Users, Content } = require('./dbObjects');
const  { Op } = require('sequelize');

module.exports = {
    memberCollection,
		getUserFromMention
};

oracle.commands = new Discord.Collection();
oracle.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    oracle.commands.set(command.name, command);
  }
}
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for(const file of eventFiles){
	const event = require(`./events/${file}`);
	if(event.once){
		oracle.once(event.name, (...args) => event.execute(...args, oracle));
	} else {
		oracle.on(event.name, (...args) => event.execute(...args, oracle));
	}
}

function getUserFromMention(mention) {
	const matches = mention.match(/^<@!?(\d+)>$/);
	if (!matches) return;
	const id = matches[1];
	return oracle.users.cache.get(id);
}

//variables from env file
const TOKEN = process.env.CLIENT_TOKEN;

//database functions
//adds a new person specified on role if they do not exist
Reflect.defineProperty(memberCollection, 'addMember', {
	value: async function addMember(id, role){
		const user = memberCollection.get(id);
		if(!user){
				const newUser = await Users.create({user_id: id, role_type: role});
				memberCollection.set(id, role);
				return newUser;
		}
	},
});

//queries their role for text output
Reflect.defineProperty(memberCollection, 'getRole', {
	value: function getRole(id){
			return memberCollection.get(id);
	},
});

Reflect.defineProperty(memberCollection, 'updateMember', {
	value: async function updateMember(id, role){
		const user = memberCollection.get(id);
		if(!user){
			memberCollection.addMember(id, role);
		} else {
			memberCollection.delete(id);
			const updateUser = await Users.upsert({user_id: id, role_type: role});
			memberCollection.set(id, role);
			return updateUser;
		}
	}
});

Reflect.defineProperty(memberCollection, 'populate', {
	value: function populate(users){
		users.forEach(u => memberCollection.set(u.user_id, u.role_type));
		return memberCollection;
	}
});

Reflect.defineProperty(membercollection, 'remove', {
  value: async function remove(user){
    memberCollection.delete(user);
    const delUser = await Users.destroy({where: {user_id: user}});
    return memberCollection;
  }
});


//oracle activation and data sync
oracle.login(TOKEN);



//exports variables and methods that can be used globally
