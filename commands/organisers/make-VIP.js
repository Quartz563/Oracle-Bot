const mentionHandler = require('../../index.js');
module.exports = {
  name: 'vip',
  description: 'Promote a participant to a VIP particpant',
  args: true,
  usage: '<user - given in form of @user>',
  aliases: ['promote-particpant', 'promote', 'viparticpiant'],
  guildOnly: true,
  roleLocked: true,
  roles: ['organiser', 'moderator', 'administrator', 'owner'],
  execute(client, message, args){
    const role = message.guild.roles.cache.find(role => role.name === 'Participant VIP');
    const member = getUserFromMention(args[0]);
    member.roles.add(role);
    const user = client.users.cache.get(member);
    user.send({embed: {
      color: 0xCC6014,
      author: {
        name: message.client.user.username,
        icon_url: message.client.user.displayAvatarURL
      },
      title: 'Notice of Promotion!',
      description: "You have been deemed worthy of the VIP Participant rank!",
      fields: [
        {
        name: 'Reason:',
        value: args[1]
      },
    ],
      timestamp: new Date(),
      footer: {
        icon_url: message.client.user.displayAvatarURL,
        text: "Praise be the Precursors"
      }
    }});
  },
};
