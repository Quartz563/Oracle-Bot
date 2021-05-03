const chalk = require('chalk');
const config = require('../config.json');
const ft = require('fs');
module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.info(chalk.cyan('Obtaining information from the Precursor Planet Core...'));
  	const storedUsers = await Users.findAll();
  	storedUsers.forEach(u => memberCollection.set(u.user_id, u.role_type));
  	console.info(chalk.green('Information Obtained -- User data syned successfully.'));
    console.info(chalk.hex('#CC6014')(`The Oracle awakens. The Precursors have begun to speak.`));
  	oracle.user.setActivity('Awaiting the one with the light');
    //todo check for reaction message, if exists: cache, else post new message and store ID for cache
    if(config.hasOwnProperty("react_message_id")){
      //cache
      client.guilds.get(config.server_ID).channels.get(config.rules_channel_ID).fetchMessage(config.react_message_id);
    } else {
      const channel = client.channels.cache.get(config.rules_channel_ID);
      channel.send({embed:{
        color: 0xCC6014,
        description: 'React with the emote below to be given the member role!'
      }}).then(sent => {
        let id = sent.id;
        config.react_message_id = id;
        fs.writeFileSync('../config.json', config);
        sent.react(config.reaction_ID);
      });

    }
  },
}
