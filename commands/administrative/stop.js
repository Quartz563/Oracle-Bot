const chalk = require('chalk');
module.exports = {
  name: 'shutdown',
  description: 'shuts the bot down',
  args: false,
  aliases: ['stop', 'stop-bot'],
  usage: 'No arguments',
  guildOnly: true,
  roleLocked: true,
  roles: ['administrator', 'owner'],
  execute(client, message, args){
    message.channel.send('The time of dormancy has come once again...');
    console.log(chalk.hex('#CC6014')('The Oracle is shutting down.'));
    process.exit();
  },
};
