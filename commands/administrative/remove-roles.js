const index = require('../../index.js');
const config = require('../../config.json');
module.exports = {
  name: 'remove-role',
  description: 'Removes a role from a specified user - Avaliable roles: organiser, partcipant',
  args: true,
  usage: '<user - given in form of @user> <role>',
  aliases: ['remove-roles', 'rr'],
  guildOnly: true,
  roleLocked: true,
  roles: ['moderator', 'administrator', 'owner'],
  execute(client, message, args){
    if(args.length < 2){
      return message.reply(`Error - Insufficent arguments given. Usage: \`${index.PREFIX}remove-roles <@user> <role>\` Avaliable roles: organiser, partcipant`);
    }
    const organiserRole = message.guild.roles.cache.find(role => role == config.roles.organiser);
    const participantRole = message.guild.roles.cache.find(role => role == config.roles.partcipant);
    const channel = client.channels.cache.get(config.bot_logs_ID);
    const member = message.mentions.users.first();
    if(member === undefined){
      message.channel.send('Error - User not found');
      return;
    }
    const user = message.guild.member(member);
    if(args[1].toUpperCase() === 'ORGANISER'){
      index.memberCollection.updateMember(user.id, 'member');
      user.roles.remove(organiserRole);
      if(user.roles.cache.some(role => role == config.roles.organiser_video)){
        user.roles.remove(message.guild.roles.cache.find(role => role == config.roles.organiser_video));
      }
      if(user.roles.cache.some(role => role == config.roles.organiser_stream)){
        user.roles.remove(message.guild.roles.cache.find(role => role == config.roles.organiser_stream));
      }
      channel.send({embed:{
        color: 0xCC6014,
        description: `${user.user.username} has been removed from the ${args[1]} role set`
      }});
    } else if(args[1].toUpperCase() === 'PARTICIPANT'){
      index.memberCollection.updateMember(user.id, 'member');
      user.roles.remove(participantRole);
      if(user.roles.cache.some(role => role == config.roles.participant_video)) {
        user.roles.remove(message.guild.roles.cache.find(role => role == config.roles.participant_video));
      }
      if(user.roles.cache.some(role => role == config.roles.participant_stream)){
        user.roles.remove(message.guild.roles.cache.find(role => role == config.roles.participant_stream));
      }
      if(user.roles.cache.some(role => role == config.roles.participant_VIP)){
        user.roles.remove(message.guild.roles.cache.find(role => role == config.roles.participant_VIP));
      }
      if(user.roles.cache.some(role => role == config.roles.participant_VC)){
        user.roles.remove(message.guild.roles.cache.find(role => role == config.roles.participant_VC));
      }
      channel.send({embed:{
        color: 0xCC6014,
        description: `${user.user.username} has been removed from the ${args[1]} role set`
      }});
    } else {
      return message.reply(`Error - Invalid arguments given. Usage: \`${index.PREFIX}remove-roles <@user> <role>\` Avaliable roles: organiser, partcipant`);
    }
  },
};
