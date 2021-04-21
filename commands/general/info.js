const index = require('../../index.js');
module.exports = {
  name: 'info',
  description: 'Find information about a specific user',
  args: false,
  usage: '<user - given in form of @user>',
  aliases: ['whois', 'who', 'roles'],
  guildOnly: true,
  //roleLocked: true,
  //roles: ['member', 'organiser', 'moderator', 'administrator'],
  execute(client, message, args){
    if(!args.length){
      const member = message.client.users.cache.get(message.author.id);
    } else {
      const member = message.client.users.cache.get(index.getUserFromMention(args[0]));
    }
    message.channel.send({embed: {
      color: 0xCC6014,
      author: {
        name: message.client.user.username,
        icon_url: message.client.user.displayAvatarURL
      },
      title: 'Precursor Data Retrieval',
      Description: `Pulling datastream for: ${member.username}`,
      fields: [
        {
        name: 'Roles:',
        value: index.memberCollection.getRole(message.author.id),
      }
    ],
      timestamp: new Date(),
      footer: {
        icon_url: message.client.user.displayAvatarURL,
        text: "Praise be the Precursors"
      }
    }});
  },
};
