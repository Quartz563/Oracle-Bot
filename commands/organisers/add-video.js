const {VideoCollection, Content } = require('../../dbObjects');
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
  execute(client, message, args){
    /*todo: first check if the args length is correct
      next check if the UIN exists already within the database
        -> check if they wish to override?
      if both are clear and fine, then upsert content *THEN* upsert videoCollection
    */
    if(args.length < 3){
      return message.reply(`Error - Insufficent arguments given. Usage: \`${PREFIX}add-video <link> <Unique Identifier Name>\``);
    }
    //now we do our database check
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
        //video already exists, override?
        //emote handler class for this
        reactionHandler.createOverrideReaction
      }
    }

  },
}
