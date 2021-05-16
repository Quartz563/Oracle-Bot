const index = require('../../index.js');
const config = require('../../config.json');
module.exports = {
  name: 'mod',
  description: 'Gives a specified user access to moderation commands',
  args: true,
  usage: '<user - given in form of @user> <mod|admin>',
  aliases: ['make-mod', 'moderator', 'add-mod'],
  guildOnly: true,
  roleLocked: true,
  roles: ['administrator', 'owner'],
  execute(client, message, args){
    if(args.length < 2){
      return message.reply(`Error - Insufficent arguments given. Usage: \`${index.PREFIX}mod <@user> <mod|admin>\``);
    }
    const PCRole = message.guild.roles.cache.find(role => role == config.roles.peace_maker);
    const ModRole = message.guild.roles.cache.find(role => role == config.roles.moderator);
    const AdminRole = message.guild.roles.cache.find(role => role == config.roles.administrator);
    const channel = client.channels.cache.get(config.bot_logs_ID);
    const newMod = message.mentions.users.first();
    if(newMod === undefined){
      message.channel.send('Error - User not found');
      return;
    }
    const user = message.guild.member(newMod);
    if(args[1].toUpperCase() === 'ADMIN'){
      if(user.roles.cache.some(role => role == config.roles.moderator)){
        const purgRole = message.guild.roles.cache.find(role => role.id === config.roles.moderator);
        user.roles.remove(purgRole);
        channel.send({embed:{
          color: 0xCC6014,
          description: `${user.user.username} has been removed the Moderator role`
        }});
      }
      index.memberCollection.updateMember(user.id, 'administrator');
      user.roles.add(AdminRole);
      user.roles.add(PCRole);
      user.send({embed: {
        color: 0xCC6014,
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.displayAvatarURL
        },
        title: 'Notice of Promotion',
        description: `Welcome aboard the Administrative team, ${user.user.username}!`,
        fields: [
          {
            name: 'New Rank',
            value: `You have been promoted to the rank of ${args[1]}, which comes with some new channels and responsibilities`
          },
          {
            name: 'Commands',
            value: `Your new position provides some new commands, use ${index.PREFIX}help to see what's new and read what they do`
          },
          {
            name: 'Rules',
            value: 'The standard rules of the server still applies, but you have some new guidelines to follow too, talk to your fellow mods and admins to see what\'s what'
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: message.client.user.displayAvatarURL,
          text: 'Praise be the Precursors'
        }
      }});
      channel.send({embed: {
        color: 0xCC6014,
        description: `${user.user.username} has been granted the ${args[1]} role`
      }});
    } else if(args[1].toUpperCase() === 'MOD'){
      if(user.roles.cache.some(role => role == config.roles.administrator)){
        const purgRole = message.guild.roles.cache.find(role => role.id === config.roles.administrator);
        user.roles.remove(purgRole);
        channel.send({embed:{
          color: 0xCC6014,
          description: `${user.user.username} has been removed the Administrator role`
        }});
      }
      index.memberCollection.updateMember(user.id, 'moderator');
      user.roles.add(ModRole);
      user.roles.add(PCRole);
      user.send({embed: {
        color: 0xCC6014,
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.displayAvatarURL
        },
        title: 'Notice of Promotion',
        description: `Welcome aboard the Moderator team, ${user.username}!`,
        fields: [
          {
            name: 'New Rank',
            value: `You have been promoted to the rank of ${args[1]}, which comes with some new channels and responsibilities`
          },
          {
            name: 'Commands',
            value: `Your new position provides some new commands, use ${index.PREFIX}help to see what's new and read what they do`
          },
          {
            name: 'Rules',
            value: 'The standard rules of the server still applies, but you have some new guidelines to follow too, talk to your fellow mods and admins to see what\'s what'
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: message.client.user.displayAvatarURL,
          text: 'Praise be the Precursors'
        }
      }});
      channel.send({embed: {
        color: 0xCC6014,
        description: `${user.user.username} has been granted the ${args[1]} role`
      }});
    } else {
      return message.reply(`Error - Invalid arguments given. Usage: \`${index.PREFIX}mod <@user> <mod|admin>\``);
    }
  },
};
