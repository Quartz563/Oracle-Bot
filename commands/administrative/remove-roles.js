const index = require('../../index.js');
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
      return message.reply(`Error - Insufficent arguments given. Usage: \`${PREFIX}remove-mod <@user> <mod|admin>\``);
    }
    const organiserRole = message.guild.roles.cache.find(role => role.name === 'Organisers');
    const participantRole = message.guild.roles.cache.find(role => role.name === 'Participants');
    const member = index.getUserFromMention(args[0]);
    const user = client.users.cache.get(oldMod);
    if(args[1].toUpperCase() === 'ORGANISER'){
      index.memberCollection.updateMember(member, 'member');
      user.roles.remove(organiserRole);
      if(user.roles.cache.some(role => role.name === 'Organiser: Video')){
        user.roles.remove(message.guild.roles.cache.find(role => role.name === 'Organiser: Video'));
      } else if(user.roles.cache.some(role => role.name === 'Organiser: Stream')){
        user.roles.remove(message.guild.roles.cache.find(role => role.name === 'Organiser: Stream'));
      }
    } else if(args[1].toUpperCase() === 'PARTICIPANT'){
      index.memberCollection.updateMember(member, 'member');
      user.roles.remove(participantRole);
      if(user.roles.cache.some(role => role.name === 'Participant: Video')) {
        user.roles.remove(message.guild.roles.cache.find(role => role.name === 'Participant: Video'));
      } else if(user.roles.cache.some(role => role.name === 'Participant: Stream')){
        user.roles.remove(message.guild.roles.cache.find(role => role.name === 'Participant: Stream'));
      }
      if(user.roles.acahe.some(role => role.name === 'Participant VIP')){
        user.roles.remove(message.guild.roles.cache.find(role => role.name === 'Participant VIP'));
      }
      if(user.roles.acahe.some(role => role.name === 'Participant VC')){
        user.roles.remove(message.guild.roles.cache.find(role => role.name === 'Participant VC'));
      }
    } else {
      return message.reply(`Error - Invalid arguments given. Usage: \`${PREFIX}remove-mod <@user> <mod|admin>\``);
    }
    message.channel.send({embed:{
      color: 0xCC6014,
      description: `${member.username} has been removed from the ${args[1]} role set`
    }});
  },
};
