const index = require('../../index.js');
module.exports = {
  name: 'core',
  description: "provides the two core roles (member and jak month) to users",
  args: true,
  usage: '<user - given in form of @user>',
  aliases: ['new', 'member', 'new-member'],
  guildOnly: true,
  roleLocked: true,
  roles: ['moderator', 'administrator'],
  execute(client, message, args){
    const roleMem = message.guild.roles.cache.find(role => role.name === 'Member');
    const member = mentionHandler.getUserFromMention(args[0]);
    const user = client.users.cache.get(member);
    user.roles.add(roleMem);
    index.memberCollection.updateMember(member, 'member');
    user.send({embed:{
      color: 0xCC6014,
      author: {
        name: message.client.user.username,
        icon_url: message.client.user.displayAvatarURL
      },
      title: 'Welcome to the Jak Month Discord!',
      description: 'It is wonderful to have you aboard, here are a few things to remember:',
      fields: [
        {
          name: 'Partipate',
          value: 'Feel free to reach out to the organisers if you want to contribute to Jak Month!'
        },
        {
          name: 'Community',
          value: 'We are all here in celebration of Jak and Daxter, so do not hestitate to engage with fellow fans!'
        },
        {
          name: 'Rules',
          value: 'Please remember to keep the rules in mind while you are here!'
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
      description: `${member.username} has been granted the Member role`
    }});
  },
};
