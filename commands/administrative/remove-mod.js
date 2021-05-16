const index = require('../../index.js');
const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = {
  name: 'demote',
  description: 'Removes the moderation role from a specified user - Avaliable roles: mod, admin',
  args: true,
  usage: '<user - given in form of @user> <mod|admin> <reason>',
  aliases: ['remove-admin', 'remove-mod'],
  guildOnly: true,
  roleLocked: true,
  roles: ['administrator', 'owner'],
  execute(client, message, args){
    if(args.length < 3){
      return message.reply(`Error - Insufficent arguments given. Usage: \`${index.PREFIX}remove-mod <@user> <mod|admin> <reason>\``);
    }
    const PCRole = message.guild.roles.cache.find(role => role == config.roles.peace_maker);
    const ModRole = message.guild.roles.cache.find(role => role == config.roles.moderator);
    const AdminRole = message.guild.roles.cache.find(role => role == config.roles.administrator);
    const channel = client.channels.cache.get(config.bot_logs_ID);
    const oldMod = message.mentions.users.first();
    if(oldMod === undefined){
      message.channel.send('Error - User not found');
      return;
    }
    const user = message.guild.member(oldMod);
    var reason = '';

    for (var i=2; i < args.length; ++i) {
      reason += (' ' + args[i]);
    }

    /*const messageEmbed = new Discord.MessageEmbed()
      .setColor(0xCC6014)
      .setTitle('Notice of Removal')
      .setDescription(`Your access to the moderation team of the Jak Month discord has been revoked`)
      .setAuthor(message.client.user.username, message.client.user.displayAvatarURL)
      .setFields({name: 'Reason:',value: `${reason}`})
      .setTimestamp()
      .setFooter("Praise be the Precursors", message.client.user.displayAvatarURL);*/


    if(args[1].toUpperCase() === 'ADMIN'){
      index.memberCollection.updateMember(user.id, 'member');
      user.roles.remove(AdminRole);
      user.roles.remove(PCRole);
      user.send({embed:{
        color: 0xCC6014,
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.displayAvatarURL
        },
        title: 'Notice of Removal',
        description: `Your access to the moderation team of the Jak Month discord has been revoked`,
        fields: [
          {name: 'Reason:',value: `${reason}`}
        ],
        timestamp: new Date(),
        footer: {
          icon_url: message.client.user.displayAvatarURL,
          text: 'Praise be the Precursors'
        }
      }});

      channel.send({embed:{
        color: 0xCC6014,
        description: `${user.user.username} has been removed from the Moderation Team` //it makes no sense but it seems to work...
      }});
    } else if(args[1].toUpperCase() === 'MOD'){
      index.memberCollection.updateMember(user.id, 'member');
      user.roles.remove(ModRole);
      user.roles.remove(PCRole);
      user.send({embed:{
        color: 0xCC6014,
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.displayAvatarURL
        },
        title: 'Notice of Removal',
        description: `Your access to the moderation team of the Jak Month discord has been revoked`,
        fields: [
          {name: 'Reason:',value: `${reason}`}
        ],
        timestamp: new Date(),
        footer: {
          icon_url: message.client.user.displayAvatarURL,
          text: 'Praise be the Precursors'
        }
      }});
      channel.send({embed:{
        color: 0xCC6014,
        description: `${user.user.username} has been removed from the Moderation Team`
      }});
    } else {
      return message.reply(`Error - Invalid arguments given. Usage: \`${index.PREFIX}remove-mod <@user> <mod|admin> <reason>\``);
    }
  },
};
