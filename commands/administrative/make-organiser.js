const mentionHandler = require('../../index.js');
module.exports = {
  name: 'organiser',
  description: 'promotes a user to the position of Organiser',
  args: true,
  usage: '<user - given in form of @user> <video|stream|both>',
  aliases: ['make-organiser'],
  guildOnly: true,
  roleLocked: true,
  roles: ['moderator', 'administrator', 'owner'],
  execute(client, message, args){
    if(args.length < 2){
      return message.reply(`Error - Insufficent arguments given. Usage: \`${PREFIX}organiser <@user> <video|stream|both>\``);
    }
    const newOrganiser = index.getUserFromMention(args[0]);
    const user = client.users.cache.get(newOrganiser);
    const OrgRole = message.guild.roles.cache.find(role => role.name === 'Organisers');
    const OrgStrRole = message.guild.roles.cache.find(role => role.name === 'Organiser: Stream');
    const OrgVidRole = message.guild.roles.cache.find(role => role.name === 'Organiser: Video');
    if(args[1].toUpperCase() === 'VIDEO'){
      index.memberCollection.updateMember(newOrganiser, 'organiser');
      user.roles.add(OrgRoleVid);
    } else if(args[1].toUpperCase() === 'STREAM'){
      index.memberCollection.updateMember(newOrganiser, 'organiser');
      user.roles.add(OrgRoleStr);
    } else if(args[1].toUpperCase() === 'BOTH'){
      index.memberCollection.updateMember(newOrganiser, 'organiser');
      user.roles.add(OrgRoleVid);
      user.roles.add(OrgStrRole);
    } else {
      return message.reply(`Error - Invalid argument. Usage: \`${PREFIX}organiser <@user> <video|stream|both>\``);
    }
    user.roles.add(OrgRole);
    user.send({embed: {
      color: 0xCC6014,
      author: {
        name: message.client.user.username,
        icon_url: message.client.user.displayAvatarURL
      },
      title: 'Notice of Promotion',
      description: `Welcome aboard the Organiser team, ${user.username}!`,
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
          value: 'The standard rules of the server still applies, but you have some new guidelines to follow too, talk to your fellow organisers, mods or admins to see what\'s what'
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
      description: `${user.username} has been granted the ${args[1]} organiser role`
    }});
  },
};
