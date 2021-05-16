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
    const channel = client.channels.cache.get(config.bot_logs_ID);
    const roleMem = message.guild.roles.cache.find(role => role.id === config.roles.member);
    const member = message.mentions.users.first();
    if(member === undefined){
      message.channel.send('Error - User not found');
      return;
    };
    const user = message.guild.member(member);
    user.roles.add(roleMem);
    if(user.roles.cache.some(role => role == config.roles.purgatory)){
      const purgRole = message.guild.roles.cache.find(role => role.id === config.roles.purgatory);
      user.roles.remove(purgRole);
      channel.send({embed:{
        color: 0xCC6014,
        description: `${user.user.username} has been removed the purgatory role`
      }});
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
          value: 'Anyone is free to contribute to Jak month in any way they wish! Draw, write, stream, video or anything to show your love of the Jak and Daxter series!\
           All content will be shown in the discord regardless of if it is scheduled or user-submitted!'
        },
        {
          name: 'Scheduled Content',
          value: 'Want to have your content release as apart of the Jak Month schedule? Contact an Organiser to start discussions about you and your contibution!'
        },
        {
          name: 'Community',
          value: 'We are all here in celebration of Jak and Daxter; so not only do we want you to engage with fellow fans, we actively encourage it!'
        },
        {
          name: 'Rules',
          value: 'Please remember to keep the rules in mind while you are here! The Precursors are watching...'
        }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: message.client.user.displayAvatarURL,
        text: 'Praise be the Precursors'
      }
    }});
    channel.send({embed: {
      color: 0xCC6014,
      description: `${user.user.username} has been granted the Member role`
    }});
  },
};
