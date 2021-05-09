const mentionHandler = require('../../index.js');
const config = require('../../config.json');
module.exports = {
  name: 'participant',
  description: 'promotes a user to the position of participant',
  args: true,
  usage: '<user - given in form of @user> <video|stream|both>',
  aliases: ['make-participant'],
  guildOnly: true,
  roleLocked: true,
  roles: ['organiser', 'moderator', 'administrator', 'owner'],
  execute(client, message, args){
    if(args.length < 2){
      return message.reply(`Error - Insufficent arguments given. Usage: \`${PREFIX}participant <@user> <video|stream|both>\``);
    }
    const guild = client.guilds.cache.get(config.guild_ID);
    const newparticipant = index.getUserFromMention(args[0]);
    const user = guild.member(newparticipant);
    const PartRole = message.guild.roles.cache.find(role => role == config.roles.participant);
    const PartStrRole = message.guild.roles.cache.find(role => role == config.roles.participant_stream);
    const PartVidRole = message.guild.roles.cache.find(role => role == config.roles.participant_video);
    if(args[1].toUpperCase() === 'VIDEO'){
      index.memberCollection.updateMember(newparticipant, 'participant');
      user.roles.add(PartRoleVid);
    } else if(args[1].toUpperCase() === 'STREAM'){
      index.memberCollection.updateMember(newparticipant, 'participant');
      user.roles.add(PartRoleStr);
    } else if(args[1].toUpperCase() === 'BOTH'){
      index.memberCollection.updateMember(newparticipant, 'participant');
      user.roles.add(PartRoleVid);
      user.roles.add(PartStrRole);
    } else {
      return message.reply(`Error - Invalid argument. Usage: \`${PREFIX}participant <@user> <video|stream|both>\``);
    }
    user.roles.add(PartRole);
    user.send({embed: {
      color: 0xCC6014,
      author: {
        name: message.client.user.username,
        icon_url: message.client.user.displayAvatarURL
      },
      title: 'Notice of Promotion',
      description: `Welcome aboard the participant team, ${user.username}!`,
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
          value: 'The standard rules of the server still applies, but you have some new guidelines to follow too, talk to your fellow participants, mods or admins to see what\'s what'
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
      description: `${user.username} has been granted the ${args[1]} participant role`
    }});
  },
};
