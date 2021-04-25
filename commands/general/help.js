require('dotenv').config();
const PREFIX = process.env.PREFIX
const index = require('../../index.js');
const Discord = require('discord.js');
module.exports = {
  name: 'help',
  description: 'Lists all commands or info about a specific command.',
  aliases: ['commands'],
  usage: '[command name]',
  cooldown: 5,
  roleLocked: true,
  roles: ['member', 'organiser', 'moderator', 'administrator'],
  execute(client, message, args){
    const cleanedCommands = new Discord.Collection();
    const {commands} = message.client;
    commands.forEach(command => {
      if(command.roleLocked){
        if (command.roles.includes(index.memberCollection.getRole(message.author.id))) {
          cleanedCommands.set(command.name, command);
        }
      } else {
        //could probably unspool this if needs be and condense it down more
        cleanedCommands.set(command.name, command);
      }
    });
    if(!args.length){
      const helpEmbed = new Discord.MessageEmbed()
       .setColor(0xCC6014)
       .setTitle('Command List')
       .setDescription(`\nYou can send \`${PREFIX}help [command name]\` to get info on a specific command!`)
       .setAuthor(message.client.user.username, message.client.user.displayAvatarURL)
       .addFields(
         { name: 'Avaliable Commands', value: cleanedCommands.map(command => command.name).join(', ')}
       )
       .setTimestamp()
       .setFooter("Praise be the Precursors", message.client.user.displayAvatarURL);
      return message.author.send(helpEmbed)
      .then(() => {
          if(message.channel.type === 'dm') return;
          message.reply('I\'ve sent you a DM with all my commands!');
        })
        .catch(error => {
          console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
          message.reply('it seems like I cannot DM you! Do you have DMs disabled?');
        });
      } else {
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        if (!command) {
	         return message.reply('that\'s not a valid command!');
         }
         //help embed constructor with variable fields implemented
         const helpEmbed = new Discord.MessageEmbed()
         	.setColor(0xCC6014)
         	.setTitle(command.name)
         	.setAuthor(message.client.user.username, message.client.user.displayAvatarURL)
         	.addFields(
         		{ name: 'Cooldown', value: `${command.cooldown || 3} second(s)`}
         	)
         	.setTimestamp()
         	.setFooter("Praise be the Precursors", message.client.user.displayAvatarURL);

        if(command.description){
          helpEmbed.setDescription(command.description)
        }

        if(command.aliases){
          helpEmbed.addField('Aliases', `${command.aliases.join(', ')}`);
        }

        if(command.usage){
          helpEmbed.addField('Usage', `${PREFIX}${command.name} ${command.usage}`);
          helpEmbed.addField('Argument Key:', '[] - Optional argument, <> - Required argument, <A|B> - Must specify A or B');
        }

        if(command.roleLocked){
          helpEmbed.addField('Avaliable to', `${command.roles.join(', ')}`);
        }

         message.channel.send(helpEmbed);
      }
  },
};
