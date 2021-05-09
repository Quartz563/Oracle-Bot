const index = require('../index.js');
const config = require('../config.json');
const reactionHandler = require('../reactionHandler.js');
module.exports = {
  name: 'messageReactionAdd',
  once: false,
  async execute(reaction, user, client){
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    let message = reaction.message, emoji = reaction.emoji;

    if(message.id == config.react_message_ID){
      if(emoji.name == config.reaction_ID){

        message.guild.fetchMember(user.id).then(member =>{
          const roleMem = message.guild.roles.cache.find(role => role == config.roles.member);
          member.roles.add(roleMem);
          index.memberCollection.updateMember(member, 'member');

          user.send({embed:{
            color: 0xCC6014,
            author: {
              name: message.client.user.username,
              icon_url: message.client.user.displayAvatarURL
            },
            title: 'Welcome to the Jak Month Discord!',
            description: 'It is wonderful to have you aboard, here are a few things to remember:',
            fields: [
              {
                name: 'Partipate',
                value: 'Feel free to reach out to the organisers if you want to contribute to Jak Month!'
              },
              {
                name: 'Community',
                value: 'We are all here in celebration of Jak and Daxter, so do not hestitate to engage with fellow fans!'
              },
              {
                name: 'Rules',
                value: 'Please remember to keep the rules in mind while you are here!'
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: message.client.user.displayAvatarURL,
              text: 'Praise be the Precursors'
            }
          }});
        });

        if(user != message.client.user){
          reactionHandler.removeReaction(user.id, message);
        }
      }
    }
  },
}
