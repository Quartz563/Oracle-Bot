const mentionHandler = require('../../index.js');
module.export = {
  name: 'mod',
  description: 'Gives a specified user access to moderation commands',
  args: true,
  usage: '<user - given in form of @user>',
  aliases: ['make-mod', 'moderator'],
  guildOnly: true,
  roleLocked: true,
  role: ['administrator'],
  execute(client, message, args){
    //note: update database alongside the roles
  },
};
