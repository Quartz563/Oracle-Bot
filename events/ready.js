const chalk = require('chalk');
const index = require('../index.js');
const fs = require('fs');
const { Users } = require('../dbObjects');
const config = require("../config.json");
require('dotenv').config();

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.info(chalk.cyan('Obtaining information from the Precursor Planet Core...'));
    try{
      const storedUsers = await Users.findAll();
      index.memberCollection.populate(storedUsers);
    } catch(e){
      console.info(chalk.red('Unable to obtain information from Precursor Planet Core.'));
      console.error(e);
      process.exit();
    }
  	console.info(chalk.green('Information Obtained -- User data syned successfully.'));
    console.info(chalk.hex('#CC6014')(`The Oracle awakens. The Precursors have begun to speak.`));
  	client.user.setActivity('Awaiting the one with the light');
    //todo check for reaction message, if exists: cache, else post new message and store ID for cache
    if(!config.hasOwnProperty("react_message_id")){
      const channel = client.channels.cache.get(config.rules_channel_ID);
      channel.send({embed:{
        color: 0xCC6014,
        description: 'React with the emote below to be given the member role!'
      }}).then(sent => {
        sent.react(config.reaction_ID);
      });
    }
  },
}
