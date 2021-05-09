const index = require('../index.js');
module.exports = {
  name: 'guildBanAdd',
  once: false,
  async execute(guild, user){
    index.memberCollection.remove(user.id);
  }
}
