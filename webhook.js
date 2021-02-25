const Discord = require('discord.js');
const axios = require('axios').default;

const client = new Discord.Client();
require('dotenv').config();

client.on('ready', () => {
  console.log('Discord webhook server ready.');
});

client.on('message', message => {
  if (message.content === 'ping') {
    message.channel.send('pong');
  }

  if (message.content.includes('search')) {
    const keywords = message.content.split(' ');
    const kw = keywords[1];
    console.log(`Incoming YT search console: ${kw}`);
    const url = encodeURI(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.GOOGLE_API_TOKEN}&type=video&q=${kw}`);
    axios.get(url).then(res => {
      const vid = res.data.items[0].id.videoId;
      message.channel.send(`https://www.youtube.com/watch?v=${vid}`);
    });
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
