module.exports = {
  name: 'embed',
  description: 'produces an embed message for testing purposes.',
  usage: '[DM: true/false]',
  cooldown: 5,
  execute(client, message, args){
    const exampleEmbed = new Discord.MessageEmbed()
    .setColor('#c74605')
    .setTitle('Oracle Prediction')
    .setAuthor('Precursor Oracle', 'https://static.wikia.nocookie.net/jakanddaxter/images/1/10/Oracle_from_Jak_II_render.png/revision/latest/scale-to-width-down/1000?cb=20190530013814')
    .setDescription('The mighty Precursor Oracle has prophesied...')
    .addFields(
      {name: 'Prophecy', value: 'you will have a nice day'}
    )
    .setTimestamp();
    message.channel.send(exampleEmbed);
  },
};
