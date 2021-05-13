const index = require('../../index.js');
const config = require('../../config.json');
module.exports = {
  name: 'core',
  description: "provides the core role (member) to users",
  args: true,
  usage: '<user - given in form of @user>',
  aliases: ['new', 'member', 'new-member', 'add-core-roles'],
  guildOnly: true,
  roleLocked: true,
  roles: ['moderator', 'administrator', 'owner'],
  execute(client, message, args){
    if(args.length < 1){
      return message.reply(`Error - Insufficent arguments given. Usage: \`${index.PREFIX}core <user - given in form of @User>\``);
    }
    const roleMem = message.guild.roles.cache.find(role => role.id === config.roles.member);
    const member = index.getUserFromMention(args[0]);
    const user = message.guild.member(member);
    user.roles.add(roleMem);
    if(user.roles.cache.some(role => role == config.roles.purgatory)){
      const purgRole = message.guild.roles.cache.find(role => role.id === config.roles.purgatory);
      user.roles.remove(purgRole);
    }
    index.memberCollection.updateMember(user.id, 'member');
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
      description: `${user.user.username} has been granted the Member role`
    }});
  },
};
