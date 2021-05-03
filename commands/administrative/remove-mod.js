const mentionHandler = require('../../index.js');
module.exports = {
  name: 'remove-mod',
  description: 'Removes the moderation role from a specified user - Avaliable roles: mod, admin',
  args: true,
  usage: '<user - given in form of @user> <mod|admin> <reason>',
  aliases: ['remove-admin', 'demote'],
  guildOnly: true,
  roleLocked: true,
  roles: ['administrator', 'owner'],
  execute(client, message, args){
    if(args.length < 3){
      return message.reply(`Error - Insufficent arguments given. Usage: \`${PREFIX}remove-mod <@user> <mod|admin>\``);
    }
    const PCRole = message.guild.roles.cache.find(role => role.name === 'Peace Keeper');
    const ModRole = message.guild.roles.cache.find(role => role.name === 'Moderator');
    const AdminRole = message.guild.roles.cache.find(role => role.name === 'Admin');
    const oldMod = index.getUserFromMention(args[0]);
    const user = client.users.cache.get(oldMod);
    if(args[1].toUpperCase() === 'ADMIN'){
      index.memberCollection.updateMember(oldMod, 'member');
      user.roles.remove(AdminRole);
    } else if(args[1].toUpperCase() === 'MOD'){
      index.memberCollection.updateMember(oldMod, 'member');
      user.roles.remove(ModRole);
    } else {
      return message.reply(`Error - Invalid arguments given. Usage: \`${PREFIX}remove-mod <@user> <mod|admin>\``);
    }
    user.roles.remove(PCRole);
    user.send({embed: {
      color: 0xCC6014,
      author: {
        name: message.client.user.username,
        icon_url: message.client.user.displayAvatarURL
      },
      title: 'Notice of Removal',
      description: "Your access to the moderation team of the Jak Month discord has been revoked",
      fields: [
        {
        name: 'Reason:',
        value: args[1]
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
      description: `${member.username} has been removed from the Moderation Team`
    }});
  },
};
