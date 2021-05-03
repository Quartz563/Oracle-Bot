const index = require('../../index.js');
module.exports = {
  name: 'mod',
  description: 'Gives a specified user access to moderation commands',
  args: true,
  usage: '<user - given in form of @user> <mod|admin>',
  aliases: ['make-mod', 'moderator'],
  guildOnly: true,
  roleLocked: true,
  roles: ['administrator', 'owner'],
  execute(client, message, args){
    if(args.length < 2){
      return message.reply(`Error - Insufficent arguments given. Usage: \`${PREFIX}mod <@user> <mod|admin>\``);
    }
    const PCRole = message.guild.roles.cache.find(role => role.name === 'Peace Keeper');
    const ModRole = message.guild.roles.cache.find(role => role.name === 'Moderator');
    const AdminRole = message.guild.roles.cache.find(role => role.name === 'Admin');
    const newMod = index.getUserFromMention(args[0]);
    const user = client.users.cache.get(newMod);
    if(args[1].toUpperCase() === 'ADMIN'){
      index.memberCollection.updateMember(newMod, 'administrator');
      user.roles.add(AdminRole);
    } else if(args[1].toUpperCase() === 'MOD'){
      index.memberCollection.updateMember(newMod, 'moderator');
      user.roles.add(ModRole);
    } else {
      return message.reply(`Error - Invalid arguments given. Usage: \`${PREFIX}mod <@user> <mod|admin>\``);
    }
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
          value: 'The standard rules of the server still applies, but you have some new guidelines to follow too, talk to your fellow mods or admins to see what's what'
        }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: message.client.user.displayAvatarURL,
        text: 'Praise be the Precursors'
      }
    }});
    message.channel.send({embed: {
      colour: 0xCC6014,
      description: `${user.username} has been granted the ${args[1]} role`
    }});
  },
};
