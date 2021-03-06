const index = require('../../index.js');
const config = require('../../config.json');
module.exports = {
  name: 'revoke',
  description: 'revokes the member role on a certain user',
  args: true,
  usage: '<user - given in form of @user> <reason>',
  aliases: ['revoke-member', 'revoke-membership'],
  guildOnly: true,
  roleLocked: true,
  roles: ['moderator', 'administrator', 'owner'],
  execute(client, message, args){
    if(args.length < 2){
      return message.reply(`Error - Insufficent arguments given. Usage: \`${index.PREFIX}revoke <user - given in form of @User> <reason>\``);
    }
    const channel = client.channels.cache.get(config.bot_logs_ID);
    const memberRole = message.guild.roles.cache.find(role => role == config.roles.member);
    const purg = message.guild.roles.cache.find(role => role == config.roles.purgatory);
    const member = message.mentions.users.first();
    if(member === undefined){
      message.channel.send('Error - User not found');
      return;
    };
    let user = message.guild.member(member);
    user.roles.remove(memberRole);
    user.roles.add(purg);
    index.memberCollection.updateMember(user.id, 'purgatory');
    var reason = '';

    for (var i=1; i < args.length; ++i) {
      reason += (' ' + args[i]);
    }

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
        value: `${reason}`
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
    channel.send({embed:{
      color: 0xCC6014,
      description: `${user.user.username} has been removed from the Member role for ${reason}`
    }});
  },
};
