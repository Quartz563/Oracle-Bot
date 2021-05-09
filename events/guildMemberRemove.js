const index = require('../index.js');
module.exports = {
  name: 'guildMemberRemove',
  once: false,
  async execute(guild, user){
    index.memberCollection.remove(user.id);
  }
}
