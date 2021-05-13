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
      if(emoji.id == config.reaction_ID){
        if(user.id != '831196204360269837'){
          const guild = client.guilds.cache.get(config.guild_ID);
          const roleMem = message.guild.roles.cache.find(role => role.id == config.roles.member);
          const member = guild.member(user);
          if(member.roles.cache.some(role => role == config.roles.purgatory)){
            user.send({embed:{
              colour: 0xCC6014,
              description: `You cannot regain your member role here, please head to the purgatory channel to request access.`
            }});
          } else if(member.roles.cache.some(role => role == config.roles.member)) {
            user.send({embed:{
              colour: 0xCC6014,
              description: `You have already been given the member role and blessed by the Precursors!`
            }});
          } else {
            member.roles.add(roleMem);
            index.memberCollection.updateMember(user.id, 'member');
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
          }
            if(user != message.client.user){
              reactionHandler.removeReaction(user.id, message);
            }
        }
      }
    }
  },
}
