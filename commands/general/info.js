const mainIndex = require('../../index.js');
module.exports = {
  name: 'info',
  description: 'Find information about a specific user',
  args: false,
  usage: '<user - given in form of @user>',
  aliases: ['whois', 'who', 'roles'],
  guildOnly: true,
  roleLocked: true,
  roles: ['member', 'organiser', 'moderator', 'administrator', 'owner'],
  execute(client, message, args){
    if(!args.length){
      const member = message.author;
      message.channel.send({embed: {
        color: 0xCC6014,
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.displayAvatarURL
        },
        title: 'Precursor Data Retrieval',
        description: `Pulling datastream...`,
        fields: [
          {
            name: 'Username',
            value: member.username,
          },
          {
          name: 'Roles',
          value: mainIndex.memberCollection.getRole(member.id),
        }
      ],
        timestamp: new Date(),
        footer: {
          icon_url: message.client.user.displayAvatarURL,
          text: "Praise be the Precursors"
        }
      }});
    } else {
      const member = index.getUserFromMention(args[0]);
      message.channel.send({embed: {
        color: 0xCC6014,
        author: {
          name: message.client.user.username,
          icon_url: message.client.user.displayAvatarURL
        },
        title: 'Precursor Data Retrieval',
        description: `Pulling datastream...`,
        fields: [
          {
            name: 'Username',
            value: member.username,
          },
          {
          name: 'Roles',
          value: userCollection.get(member.id),
        }
      ],
        timestamp: new Date(),
        footer: {
          icon_url: message.client.user.displayAvatarURL,
          text: "Praise be the Precursors"
        }
      }});
    }

  },
};
