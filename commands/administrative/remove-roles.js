const mentionHandler = require('../../index.js');
module.exports = {
  name: 'remove-roles',
  description: 'Removes the member role from a specified user',
  args: true,
  usage: '<user - given in form of @user>',
  aliases: ['remove-role', 'rr'],
  guildOnly: true,
  roleLocked: true,
  roles: ['moderator', 'administrator'],
  execute(client, message, args){
    //note: update database alongside the roles
  },
};
