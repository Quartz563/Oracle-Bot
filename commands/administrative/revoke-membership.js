const mentionHandler = require('../../index.js');
module.export = {
  name: 'revoke',
  description: 'revokes the member role on a certain user',
  args: true,
  usage: '<user - given in form of @user> <reason>',
  aliases: ['revoke-member'],
  guildOnly: true,
  roleLocked: true,
  roles: ['moderator', 'administrator'],
  execute(client, message, args){
    const role = message.guild.roles.cache.find(role => role.name === 'Member');
    const member = getUserFromMention(args[0]);
    member.roles.remove(role);
    const user = client.users.cache.get(member);
    user.send({embed: {
      color: 0xCC6014,
      author: {
        name: message.client.user.username,
        icon_url: message.client.user.displayAvatarURL
      },
      title: 'Notice of Removal',
      description: "Your access to the Jak Month discord has been restricted.",
      fields: [
        {
        name: 'Reason:',
        value: args[1]
      },
      {
        name: 'Process of Appeal',
        value: "If you wish to appeal this removal, please head to the Purgatory channel in the Jak Month discord for more details"
      }
    ],
      timestamp: new Date(),
      footer: {
        icon_url: message.client.user.displayAvatarURL,
        text: "Praise be the Precursors"
      }
    }});
    //send a message to the administrative channel noting the changes
    message.channel.send({embed:{
      color: 0xCC6014,
      description: `${args[0]} has been removed from the Member role`
    }});
  },
};
