const config = require('../../config.json');
module.exports = {
  name: 'reaction',
  description: 'for use when the bot removes a reaction',
  args: false,
  usage: 'No arguments',
  guildOnly: true,
  roleLocked: true,
  roles: ['administrator', 'owner'],
  execute(client, message, args){
    client.channels.cache.get(config.rules_channel_ID).messages.fetch(config.react_message_ID).then(fetched => fetched.react(config.reaction_ID));
  },
};
