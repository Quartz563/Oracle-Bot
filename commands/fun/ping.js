module.exports = {
  name: 'ping',
  description: 'Ping!',
  cooldown: 10,
  roleLocked: true,
  roles: ['member', 'participant', 'organiser', 'moderator', 'administrator', 'owner'],
  execute(client, msg, args) {
    msg.reply('pong');
  },
};
