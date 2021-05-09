const index = require('../../index.js');
const config = require('../../config.json');
module.exports = {
  name: 'remove-roles',
  description: 'Removes a role from a specified user - Avaliable roles: organiser, partcipant',
  args: true,
  usage: '<user - given in form of @user> <role>',
  aliases: ['remove-role', 'rr'],
  guildOnly: true,
  roleLocked: true,
  roles: ['moderator', 'administrator', 'owner'],
  execute(client, message, args){
    if(args.length < 2){
      return message.reply(`Error - Insufficent arguments given. Usage: \`${PREFIX}remove-roles <@user> <role>\` Avaliable roles: organiser, partcipant`);
    }
    const guild = client.guilds.cache.get(config.guild_ID);
    const organiserRole = message.guild.roles.cache.find(role => role == config.roles.organiser);
    const participantRole = message.guild.roles.cache.find(role => role == config.roles.partcipant);
    const member = index.getUserFromMention(args[0]);
    const user = guild.member(oldMod);
    if(args[1].toUpperCase() === 'ORGANISER'){
      index.memberCollection.updateMember(member, 'member');
      user.roles.remove(organiserRole);
      if(user.roles.cache.some(role => role == config.roles.organiser_video)){
        user.roles.remove(message.guild.roles.cache.find(role => role == config.roles.organiser_video));
      } else if(user.roles.cache.some(role => role == config.roles.organiser_stream)){
        user.roles.remove(message.guild.roles.cache.find(role => rolerole == config.roles.organiser_stream));
      }
    } else if(args[1].toUpperCase() === 'PARTICIPANT'){
      index.memberCollection.updateMember(member, 'member');
      user.roles.remove(participantRole);
      if(user.roles.cache.some(role => role == config.roles.participant_video)) {
        user.roles.remove(message.guild.roles.cache.find(role => role == config.roles.participant_video));
      } else if(user.roles.cache.some(role => role == config.roles.participant_stream)){
        user.roles.remove(message.guild.roles.cache.find(role => role == config.roles.participant_stream));
      }
      if(user.roles.acahe.some(role => role == config.roles.participant_VIP)){
        user.roles.remove(message.guild.roles.cache.find(role => role == config.roles.participant_VIP));
      }
      if(user.roles.acahe.some(role => role == config.roles.participant_VC)){
        user.roles.remove(message.guild.roles.cache.find(role => role == config.roles.participant_VC));
      }
    } else {
      return message.reply(`Error - Invalid arguments given. Usage: \`${PREFIX}remove-roles <@user> <role>\` Avaliable roles: organiser, partcipant`);
    }
    message.channel.send({embed:{
      color: 0xCC6014,
      description: `${member.username} has been removed from the ${args[1]} role set`
    }});
  },
};
