const index = require('../../index.js');

module.exports = {
  name: 'info',
  description: 'Find information about a specific user',
  args: false,
  usage: '<user - given in form of @user>',
  aliases: ['whois', 'who', 'roles'],
  guildOnly: true,
  roleLocked: true,
  roles: ['member', 'participant', 'organiser', 'moderator', 'administrator', 'owner'],
  execute(client, message, args){
    const orb = client.emojis.cache.get('834452840545648705');
    const cell = client.emojis.cache.get('843521459514245150');
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
          value: index.memberCollection.getRole(member.id),
        },
        {
          name: 'Wallet',
          value: `${orb}${index.currency.getBalance(member.id, 'ORB')} Precursor Orb(s)`
        },
        {
          name: '\u200B',
          value: `${cell}${index.currency.getBalance(member.id, 'CELL')} Power Cell(s)`,
          inline: true
        }
      ],
        timestamp: new Date(),
        footer: {
          icon_url: message.client.user.displayAvatarURL,
          text: "Praise be the Precursors"
        }
      }});
    } else {
      const member = message.mentions.users.first();
      if(member === undefined){
        message.channel.send('Error - User not found');
        return;
      }
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
          value: index.memberCollection.getRole(member.id),
        },
        {
          name: 'Wallet',
          value: `${orb}${index.currency.getBalance(member.id, 'ORB')} Precursor Orb(s)`
        },
        {
          name: '\u200B',
          value: `${cell}${index.currency.getBalance(member.id, 'CELL')} Power Cell(s)`,
          inline: true
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
