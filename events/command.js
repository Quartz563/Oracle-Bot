const Discord = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const index = require('../index.js');

const PREFIX = process.env.PREFIX;

function getUserFromMention(mention) {
	const matches = mention.match(/^<@!?(\d+)>$/);
	if (!matches) return;
	const id = matches[1];
	return oracle.users.cache.get(id);
}

module.exports = {
  name: 'message',
  once: false,
  execute(message, oracle){
		if(message.author.bot) return;
		index.currency.add(message.author.id, 1, 'ORB');

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

    //checks database for specifc person authorisation
    if(command.roleLocked){
    		const role = index.memberCollection.getRole(message.author.id);
    		if(command.roles && command.roles.includes(role)){
    			console.log(`Command usage authorised: role: ${role}, minimum required: ${command.roles[0]}`);
    		} else {
          console.log(`Unauthorised access of Precursor technology by ${message.author.username} with role ${role}`);
    			console.log(`Required minimum role: ${command.roles[0]}`);
    			return message.channel.send(`You cannot use this command, ${message.author}, as you do not have permissions for it!`);
        }
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

  //command execution
    try{
      command.execute(oracle, message, args);
    } catch (error) {
      console.error(error);
      message.reply('The Precursors could not decipher what you attempted (Invalid command!)');
    }
  },
}
