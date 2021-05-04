const Discord = require('discord.js');
const Client = new Discord.Client();

//removes a reaction from a specified message from a specified user
async function removeReaction(userID, message){
  const reactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(userID));
  try {
    for(const reaction of reactions.values()) {
      await reaction.users.remove(userID);
    }
  } catch (error){
    console.error('Failed to remove reactions.');
  }
  return;
}

//binds a collector to a specific message, returns true if approved, false if not and immplements a timeout option
function createOverrideReaction(user, message){
  message.react('✅').then(r => {message.react('❌');});
  message.awaitReactions((reaction, user) => user.id === message.author.id && (reaction.emoji.name == '✅' || reaction.emote.name == '❌'),
  {max: 1, time: 30000}).then(collected => {
    if(collected.first().emoji.name == '✔') {
      return true;
    } else {
      return false;
    }
  }).catch(() => {
    message.reply('No reaction after 30 seconds, operation cancelled');
  });
}

module.exports = {
  removeReaction,
  createOverrideReaction
};
