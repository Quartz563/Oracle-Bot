const mentionHandler = requires('./index.js')
module.export = {
  name: 'remove-core',
  description: 'Removes the member role from a specified user',
  args: true,
  usage: '<user - given in form of @user>',
  aliases: ['make-mod', 'moderator'],
  guildOnly: true,
  roleLocked: true,
  role: ['moderator', 'administrator'],
  execute(client, message, args){
    //note: update database alongside the roles
  },
};
