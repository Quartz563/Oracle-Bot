require('dotenv').config();
const chalk = require('chalk');
const fs = require('fs');
const config = require("./config.json");
const Discord = require('discord.js');
const oracle = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const memberCollection = new Discord.Collection();
const currency = new Discord.Collection();
const { Users, Content, CurrencyShop } = require('./dbObjects');
const  { Op } = require('sequelize');

//variables from env file
const TOKEN = process.env.CLIENT_TOKEN;
const PREFIX = process.env.PREFIX;

//exports variables and methods that can be used globally
module.exports = {
    memberCollection,
    currency,
    PREFIX
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

//database functions
async function createNewUserEntry(id, role, orb_bal, cell_bal){
  const newUser = await Users.create({user_id: id, role_type: role, orb_balance: orb_bal, PC_balance: cell_bal});
  return newUser;
}

//adds a new person specified on role if they do not exist
Reflect.defineProperty(memberCollection, 'addMember', {
	value: async function addMember(id, role){
		const user = memberCollection.get(id);
		if(!user){
				createNewUserEntry(id, role, 0, 0);
				memberCollection.set(id, role);
				return newUser;
		}
	},
});

//queries their role for text output
Reflect.defineProperty(memberCollection, 'getRole', {
	value: function getRole(id){
    if(!memberCollection.get(id)){
      return console.log('Error - user not found');
    } else {
      return memberCollection.get(id);
    }
	},
});


Reflect.defineProperty(memberCollection, 'populate', {
	value: function populate(users){
		users.forEach(u => memberCollection.set(u.user_id, u.role_type));
		return memberCollection;
	}
});

Reflect.defineProperty(memberCollection, 'remove', {
  value: async function remove(user){
    memberCollection.delete(user);
    const delUser = await Users.destroy({where: {user_id: user}});
    return memberCollection;
  }
});

Reflect.defineProperty(currency, 'add', {
  value: async function add(id, amount, type){
    const user = currency.get(id);
    if(user) {
      if(type == 'ORB'){
        user.orb_balance += Number(amount);
        return user.save();
      } else if(type == 'CELL'){
        user.PC_balance += Number(amont);
        return user.save();
      }
    }
    createNewUserEntry(id, role, 0, 0);
    currency.set(id, newUser);
    return newUser;
  }
});

Reflect.defineProperty(currency, 'getBalance', {
  value: function getBalance(id, type){
    const user = currency.get(id);
    if(type == 'ORB'){
      return user ? user.orb_balance : 0;
    } else if(type == 'CELL') {
      return user ? user.PC_balance : 0;
    }
  }
});

Reflect.defineProperty(currency, 'populate', {
	value: function populate(users){
		users.forEach(u => currency.set(u.user_id, u));
		return currency;
	}
});

Reflect.defineProperty(memberCollection, 'updateMember', {
	value: async function updateMember(id, role){
		const user = memberCollection.get(id);
		if(!user){
			memberCollection.addMember(id, role);
		} else {
			memberCollection.delete(id);
			const updateUser = await Users.upsert({user_id: id, role_type: role, orb_balance: currency.getBalance(id, 'ORB'), PC_balance: currency.getBalance(id, 'CELL')});
			memberCollection.set(id, role);
			return updateUser;
		}
	}
});

Object.defineProperty(oracle.commands, 'roleLocked', {
  defaultValue: false,
  writable: true,
  configurable: true
});

Object.defineProperty(oracle.commands, 'roles', {
  defaultValue: ['member', 'organiser', 'moderator', 'administrator', 'owner'],
  writable: true,
  configurable: true
});

//oracle activation and data sync
oracle.login(TOKEN);
