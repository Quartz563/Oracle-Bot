module.exports = {
  name: 'begin-jak-month',
  description: 'Applies the Jak Month role to all applicable members',
  args: false,
  aliases: ['begin', 'bjm'],
  guildOnly: true,
  roleLocked: true,
  roles: ['administrator'],
  execute(client, message, args){
    message.guild.members.fetch().then(fetchedMembers => {
	   const usersWithMember = fetchedMembers.filter(member => member.roles.cache.some(role => role.name === 'Member'));
     const JMrole = message.guild.roles.cache.find(role => role.name === 'Jak Month');
     usersWithMember.forEach(user => {
       user.roles.add(JMrole);
     });
     //todo announce the beginning of the celebration?
    });
  },
};