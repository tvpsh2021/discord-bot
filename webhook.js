const Discord = require('discord.js');
const axios = require('axios').default;

const client = new Discord.Client();
require('dotenv').config();

client.on('ready', () => {
  console.log('Discord webhook server ready.');
});

client.on('message', message => {
  if (message.content.startsWith('ping')) {
    message.channel.send('pong');
  }

  if (message.content.startsWith('yt')) {
    const parsedContent = message.content.split(' ');
    parsedContent.shift();
    const keyword = (parsedContent.join(' ')).trim();
    console.log(`Incoming YT search console: ${keyword}`);
    const url = encodeURI(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.GOOGLE_API_TOKEN}&type=video&q=${keyword}`);
    axios.get(url).then(res => {
      const vid = res.data.items[0].id.videoId;
      message.channel.send(`https://www.youtube.com/watch?v=${vid}`);
    });
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
