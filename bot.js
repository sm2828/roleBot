const Discord = require('discord.js');
const client = new Discord.Client();

const botToken = 'YOUR_BOT_TOKEN';
const roleToRemove = 'Green Role ID';
const roleToNotify = 'Notification Role ID';

client.on('ready', () => {
  console.log(`Bot is ready as ${client.user.tag}.`);
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
  const user = newMember.user;

  if (newMember.roles.cache.has(roleToRemove) && !oldMember.roles.cache.has(roleToRemove)) {
    const timeDelay = 60000; // 1 minute

    setTimeout(() => {
      newMember.roles.remove(roleToRemove)
        .then(() => {
          const channelID = 'Your Channel ID';
          const channel = client.channels.cache.get(channelID);

          channel.send(`<@${user.id}>, you are no longer green! You must now be here forever.`);
        })
        .catch(console.error);
    }, timeDelay);
  }
});

client.login(botToken);
