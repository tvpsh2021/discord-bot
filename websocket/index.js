const Discord = require('discord.js');
const axios = require('axios').default;
const { getDinner } = require('./helper');
const client = new Discord.Client();
require('dotenv').config();

function checkFullEqualCommand({ msgContent, msgInstance }) {
  switch (msgContent) {
    case 'ping': {
      msgInstance.channel.send('pong');
      break;
    }
    case '!help': {
      msgInstance.channel.send(`亦凡可以幫你： \n\n \`ping\` : 看看亦凡有沒有醒著 \n \`yt\` : 亦凡幫你搜尋 YouTube \n \`dinner\` : 晚餐吃什麼`);
      break;
    }
    case 'dinner': {
      const dinner = getDinner();
      msgInstance.channel.send(`${dinner.title} \n ${dinner.url}`);
      break;
    }
  }
}

function checkCommand({ msgContent, msgInstance }) {
  if (msgContent.startsWith('yt')) {
    const parsedContent = msgContent.split(' ');
    parsedContent.shift();
    const keyword = (parsedContent.join(' ')).trim();
    console.log(`Incoming YT search console: ${keyword}`);
    const url = encodeURI(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.GOOGLE_API_TOKEN}&type=video&q=${keyword}`);
    axios.get(url).then(res => {
      const vid = res.data.items[0].id.videoId;
      msgInstance.channel.send(`Search YouTube: ${keyword}\nhttps://www.youtube.com/watch?v=${vid}`);
    });
    return;
  }
}

client.on('ready', () => {
  console.log('Discord webhook server ready.');
});

client.on('message', msgInstance => {
  const msgContent = msgInstance.content.toLowerCase();

  checkFullEqualCommand({ msgContent, msgInstance });
  checkCommand({ msgContent, msgInstance });
});

client.login(process.env.DISCORD_BOT_TOKEN);
