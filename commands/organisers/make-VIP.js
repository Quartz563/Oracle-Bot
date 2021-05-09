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
    const guild = client.guilds.cache.get(config.guild_ID);
    const role = message.guild.roles.cache.find(role => role == config.roles.participant_VIP);
    const member = getUserFromMention(args[0]);
    const user = guild.member(member);
    user.roles.add(role);
    user.send({embed: {
      color: 0xCC6014,
      author: {
        name: message.client.user.username,
        icon_url: message.client.user.displayAvatarURL
      },
      title: 'Notice of Promotion!',
      description: "You have been deemed worthy of the VIP Participant rank!",
      timestamp: new Date(),
      footer: {
        icon_url: message.client.user.displayAvatarURL,
        text: "Praise be the Precursors"
      }
    }});
  },
};
