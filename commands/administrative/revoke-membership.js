const mentionHandler = require('../../index.js');
const config = require('../../config.json');
module.exports = {
  name: 'revoke',
  description: 'revokes the member role on a certain user',
  args: true,
  usage: '<user - given in form of @user> <reason>',
  aliases: ['revoke-member'],
  guildOnly: true,
  roleLocked: true,
  roles: ['moderator', 'administrator', 'owner'],
  execute(client, message, args){
    const guild = client.guilds.cache.get(config.guild_ID);
    const role = message.guild.roles.cache.find(role => role == config.roles.member);
    const purg = guild.roles.cache.find(role => role == config.roles.purgatory);
    const member = getUserFromMention(args[0]);
    let user = guild.member(member);
    user.roles.remove(role);
    user.roles.add(purgatory);
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
      description: `${member.username} has been removed from the Member role`
    }});
  },
};
