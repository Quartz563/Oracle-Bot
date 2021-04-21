const mentionHandler = require('../../index.js');
module.export = {
  name: 'organiser',
  description: 'promotes a user to the position of Organiser',
  args: true,
  usage: '<user - given in form of @user>',
  aliases: ['make-organiser'],
  guildOnly: true,
  roleLocked: true,
  role: ['moderator', 'administrator'],
  execute(client, message, args){
    //note: update database alongside the roles
  },
};
