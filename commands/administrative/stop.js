const chalk = require('chalk');
module.export = {
  name: 'shutdown',
  description: 'shuts the bot down',
  guildOnly: true,
  roleLocked: true,
  role: ['administrator'],
  execute(client, message, args){
    message.channel.send('The time of dormancy has come once again...')
    console.log(chalk.hex('#CC6014')('The Oracle is shutting down.'))
    process.exit();
  },
};
