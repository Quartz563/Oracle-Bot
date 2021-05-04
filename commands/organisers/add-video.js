const {VideoCollection, Content } = require('../../dbObjects');
const Discord = require('discord.js');
const reactionHandler = require('../../reactionHandler');
module.exports = {
  name: 'add-video',
  description: 'Adds a new link into the database collection',
  args: true,
  usage: '<link> <unique identifier name> <Participant - given in @User>',
  aliases: ['a-v', 'new-video', 'n-v'],
  guildOnly: true,
  roleLocked: true,
  roles: ['organiser', 'moderator', 'administrator', 'owner'],
  async execute(client, message, args){
    if(args.length < 3){
      return message.reply(`Error - Insufficent arguments given. Usage: \`${PREFIX}add-video <link> <Unique Identifier Name>\``);
    }
    try{
      const newVideo = await Content.create({
        video_lable: args[1],
        video_link: args[0],
        particpiant: args[3],
      });
      const video = await VideoCollection.create({
        user_id: message.author.id,
        video_id: newVideo.video_lable,
      });
      return message.reply(`Video ${newVideo.name} added.`)
    } catch (e){
      if(e.name === 'SequelizeUniqueConstraintError'){
        const errorEmbed = new Discord.MessageEmbed()
         .setColor(0xCC6014)
         .setTitle('Warning')
         .setDescription(`This entry already exists within the database! Override?`)
         .setAuthor(message.client.user.username, message.client.user.displayAvatarURL)
         .setTimestamp()
         .setFooter("Praise be the Precursors", message.client.user.displayAvatarURL);
        if(reactionHandler.createOverrideReaction(message.author.id, errorEmbed) == true){
          const updatedVideo = await Content.update({
            video_lable: args[1],
            video_link: args[0],
            particpiant: args[3],
          });
          const video = await VideoCollection.update({
            user_id: message.author.id,
            video_id: newVideo.video_lable,
          });
        } else {
          const resolvedEmbed = new Discord.MessageEmbed()
           .setColor(0xCC6014)
           .setDescription(`Operation cancelled.`)
           .setAuthor(message.client.user.username, message.client.user.displayAvatarURL)
           .setTimestamp()
           .setFooter("Praise be the Precursors", message.client.user.displayAvatarURL);
          errorEmbed.edit(resolvedEmbed);
        }
      }
    }

  },
}
