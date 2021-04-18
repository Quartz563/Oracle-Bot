module.exports = {
  name: 'embed-test',
  description: 'produce an embed',
  execute(client, message, args){
    message.channel.send({embed: {
      color: 0xCC6014,
      author: {
        name: message.client.user.username,
        icon_url: message.client.user.displayAvatarURL
      },
      title: 'Oracle Wisdom',
      description: "testing testing 123",
      fields: [{
        name: 'Prophecy',
        value: 'you will have a nice day'
      }],
      timestamp: new Date(),
      footer: {
        icon_url: message.client.user.displayAvatarURL,
        text: "Praise be the Precursors"
      }
    }})
  },
};
