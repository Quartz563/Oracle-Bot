const index = require('../../index.js');
module.exports = {
  name: 'leaderboard',
  description: 'Display the leaderboard for the most Precursor Orbs!',
  cooldown: 10,
  roleLocked: true,
  roles: ['member', 'participant', 'organiser', 'moderator', 'administrator', 'owner'],
  execute(client, msg, args) {
    message.channel.send('Precursor Orb Ranking:');
    message.channel.send(
      index.currency.sort((a, b) => b.orb_balance - a.orb_balance)
        .filter(user => client.users.cache.has(user.user_id))
        .first(10)
        .map((user, position) => `(${position + 1}) ${client.users.cache.get(user.user_id).tag}: ${user.orb_balance}`)
        .join('\n'),
      {code: true},
    );
    message.channel.send('Power Cell Ranking:');
    message.channel.send(
      index.currency.sort((a, b) => b.PC_balance - a.PC_balance)
        .filter(user => client.users.cache.has(user.user_id))
        .first(10)
        .map((user, position) => `(${position + 1}) ${client.users.cache.get(user.user_id).tag}: ${user.orb_balance}`)
        .join('\n'),
      {code: true},
    );
  },
};
