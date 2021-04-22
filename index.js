require('dotenv').config();
const chalk = require('chalk');
const fs = require('fs');
const Discord = require('discord.js');
const oracle = new Discord.Client();
oracle.commands = new Discord.Collection();
oracle.cooldowns = new Discord.Collection();
const memberCollection = new Discord.Collection();
const { Users, Content} = require('./dbObjects');
const  { Op } = require('sequelize');

//primary command loops
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		oracle.commands.set(command.name, command);
	}
}

//variables from env file
const TOKEN = process.env.CLIENT_TOKEN;
const PREFIX = process.env.PREFIX;

//database functions
//adds a new person specified on role if they do not exist
Reflect.defineProperty(memberCollection, 'add', {
	value: async function addMember(id, role){
		const user = collection.get(id);
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

Object.defineProperty(oracle.commands, 'roleLocked', {
	defaultValue: false,
	writable: true,
	configurable: true
});

//handle an array
Object.defineProperty(oracle.commands, 'roles', {
	defaultValue: ['member', 'organiser', 'moderator', 'administrator'],
	writable: true,
	configurable: true
});

//oracle activation and data sync
oracle.login(TOKEN);
oracle.on('ready', async message => {
	console.info(chalk.cyan('Obtaining information from the Precursor Planet Core...'));
	const storedUsers = await Users.findAll();
	storedUsers.forEach(u => memberCollection.set(u.user_id, u.role_type));
	console.info(chalk.green('Information Obtained -- User data syned successfully.'));
  console.info(chalk.hex('#CC6014')(`The Oracle awakens. The Precursors have begun to speak.`));
	oracle.user.setActivity('Awaiting the one with the light');
});

//says what it does on the tin
function getUserFromMention(mention) {
	const matches = mention.match(/^<@!?(\d+)>$/);
	if (!matches) return;
	const id = matches[1];
	return oracle.users.cache.get(id);
}

//basic command event handling
oracle.on('message', message => {
  if(!message.content.startsWith(PREFIX) || message.author.oracle) return;
  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  //if it isnt a command, return
  if(!oracle.commands.has(commandName)) return;

//if exists or has another name, create the command
  const command = oracle.commands.get(commandName) || oracle.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;

//execute commands only on server
  if(command.guildOnly && message.channel.type === 'dm'){
    return message.reply('I can\'t execute that command inside DMs!');
  }

//permissions required to execute command
  if(command.permissions){
    const authorPerms = message.channel.permissionsFor(message.author);
    if(!authorPerms || !authorPerms.has(command.permissions)){
      return message.reply('You cannot do this!');
    }
  }

//command argument required
  if(command.args && !args.length){
    let reply = `You did not provide any arguments, ${message.author}!`;
    if(command.usage){
      reply += `\nThe proper usage would be: \`${PREFIX}${command.name} ${command.usage}\``;
    }
    return message.channel.send(reply)
  }

//command cooldowns
  const {cooldowns} = oracle;
  if(!cooldowns.has(command.name)){
    cooldowns.set(command.name, new Discord.Collection());
  }
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;
  if(timestamps.has(message.author.id)){
    const experiationTime = timestamps.get(message.author.id) + cooldownAmount;
    if(now < experiationTime){
      const timeLeft = (experiationTime - now) / 1000;
      return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\`command.`);
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

//checks database for specifc person authorisation
if(command.roleLocked){
		const role = memberCollection.getRole(message.author.id);
		if(!oracle.commands.find(cmd => cmd.roles && cmd.roles.includes(role))){
			console.log(`Unauthorised access of Precursor technology by ${message.author.username} with role ${role}`);
			console.log(`Required minimum role: ${command.roles[0]}`);
			return message.channel.send(`You cannot use this command, ${message.author}`);
		}
}

//command execution
  try{
    command.execute(oracle, message, args);
  } catch (error) {
    console.error(error);
    message.reply('The Precursors could not decipher what you attempted (Invalid command!)');
  }
});

//exports variables and methods that can be used globally
module.exports = {
    memberCollection,
		getUserFromMention,
		Discord
};
