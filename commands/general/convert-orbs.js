const index = require('../../index.js');

module.exports = {
  name: 'convert-orbs',
  description: 'Find information about a specific user',
  args: false,
  usage: '<user - given in form of @user>',
  aliases: ['convert', 'c-o'],
  guildOnly: true,
  roleLocked: true,
  roles: ['member', 'participant', 'organiser', 'moderator', 'administrator', 'owner'],
  execute(client, message, args){
    
  },
}
