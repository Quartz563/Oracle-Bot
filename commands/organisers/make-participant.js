const index = require('../../index.js');
const config = require('../../config.json');
const Discord = require('discord.js');

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
      return message.reply(`Error - Insufficent arguments given. Usage: \`${index.PREFIX}participant <@user> <video|stream|both>\``);
    }
    const newParticipant = message.mentions.users.first();
    if(newParticipant === undefined){
      message.channel.send('Error - User not found');
      return;
    };
    const user = message.guild.member(newParticipant);
    const PartRole = message.guild.roles.cache.find(role => role == config.roles.participant);
    const PartStrRole = message.guild.roles.cache.find(role => role == config.roles.participant_stream);
    const PartVidRole = message.guild.roles.cache.find(role => role == config.roles.participant_video);
    const channel = client.channels.cache.get(config.bot_logs_ID);

    if(args[1].toUpperCase() === 'VIDEO'){
      index.memberCollection.updateMember(user.id, 'participant');
      user.roles.add(PartRole);
      user.roles.add(PartVidRole);
      user.send({embed: {
        color: 0xCC6014,
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.displayAvatarURL
        },
        title: 'Notice of Promotion',
        description: `Welcome aboard the Participant team, ${user.user.username}!`,
        fields: [
          {
            name: 'New Rank',
            value: `You have been promoted to the rank of ${args[1]}, which comes with some new channels and responsibilities`
          },
          {
            name: 'Videos',
            value: 'You have signed up to make some Videos! Details of the process will be given to you via the Organisers in charge of Videos.'
          },
          {
            name: 'Rules',
            value: 'The standard rules of the server still applies, but you have some new responsibilities too, all explained in the Welcome channel of the Jak Month Discord.'
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
        description: `${user.user.username} has been granted the ${args[1]} participant role`
      }});
    } else if(args[1].toUpperCase() === 'STREAM'){
      index.memberCollection.updateMember(user.id, 'participant');
      user.roles.add(PartRole);
      user.roles.add(PartStrRole);
      user.send({embed: {
        color: 0xCC6014,
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.displayAvatarURL
        },
        title: 'Notice of Promotion',
        description: `Welcome aboard the Participant team, ${user.user.username}!`,
        fields: [
          {
            name: 'New Rank',
            value: `You have been promoted to the rank of ${args[1]}, which comes with some new channels and responsibilities`
          },
          {
            name: 'Streaming',
            value: 'You have signed up to do some Streaming! Details of the process will be given to you via the Organisers in charge of Streaming.'
          },
          {
            name: 'Rules',
            value: 'The standard rules of the server still applies, but you have some new responsibilities too, all explained in the Welcome channel of the Jak Month Discord.'
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
        description: `${user.user.username} has been granted the ${args[1]} participant role`
      }});
    } else if(args[1].toUpperCase() === 'BOTH'){
      index.memberCollection.updateMember(user.id, 'participant');
      user.roles.add(PartRole);
      user.roles.add(PartVidRole);
      user.roles.add(PartStrRole);
      user.send({embed: {
        color: 0xCC6014,
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.displayAvatarURL
        },
        title: 'Notice of Promotion',
        description: `Welcome aboard the Participant team, ${user.user.username}!`,
        fields: [
          {
            name: 'New Rank',
            value: `You have been promoted to the rank of ${args[1]}, which comes with some new channels and responsibilities`
          },
          {
            name: 'Both Categories',
            value: 'You have signed up to both categories! You will be quite busy, but Organisers from both Streaming and Videos are on hand to help you out'
          },
          {
            name: 'Rules',
            value: 'The standard rules of the server still applies, but you have some new responsibilities too, all explained in the Welcome channel of the Jak Month Discord.'
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
        description: `${user.user.username} has been granted the ${args[1]} participant role`
      }});
    } else {
      return message.reply(`Error - Invalid argument. Usage: \`${index.PREFIX}participant <@user> <video|stream|both>\``);
    }
  },
};
