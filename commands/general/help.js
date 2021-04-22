require('dotenv').config();
const PREFIX = process.env.PREFIX
const index = require('../../index.js');
/*
Righty then, lets break down how we wish to do this:
first: we need to get the collection of all commands avaliable in the bot,
second: we must *clean* these commands by getting their roles and checking if the sender has a role contained within
  if yes, then add it to our new array
  if not, then we move onto the next one
third: we create an embed message that will be sent to the user's DM in question
forth: we reconfigure the args system below to send an embed about the command rather than a plain text message
finally: congratulate yourself on having the bot at 90% compleation
*/
module.exports = {
  name: 'help',
  description: 'Lists all commands or info about a specific command.',
  aliases: ['commands'],
  usage: '[command name]',
  cooldown: 5,
  execute(client, message, args){

    const data = [];
    const {commands} = message.client;
    if(!args.length){
      data.push('Here\'s a list of all my commands: ');
      data.push(commands.map(command => command.name).join(', '));
      data.push(`\nYou can send \`${PREFIX}help [command name]\` to get info on a specific command!`);
      return message.author.send(data, {split: true})
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
        const helpEmbed = new index.Discord.MessageEmbed()
          .setColor(0xCC6014)
          .setAuthor(message.client.user.username, message.client.user.displayAvatarURL)
          .setTitle(command.name)
          .setFields(
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
        }

        if(command.roleLocked){
          helpEmbed.addField('Avaliable to', `${command.roles.join(', ')}`);
        }

         message.channel.send(helpEmbed);
      }
  },
};
