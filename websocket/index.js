const Discord = require('discord.js');
const axios = require('axios').default;
const { getDinner } = require('./helper');
const client = new Discord.Client();
require('dotenv').config();

async function checkFullEqualCommand({ msgContent, msgInstance }) {
  switch (msgContent) {
    case 'ping': {
      await msgInstance.channel.send('pong pong');
      await msgInstance.channel.send('pong pong pong');
      break;
    }
    case '!help': {
      await msgInstance.channel.send(`
輸入指令讓亦凡幫你:

1️⃣ \`ping\`: 看看亦凡有沒有醒著
2️⃣ \`yt [關鍵字]\`: 亦凡幫你搜尋 YouTube
3️⃣ \`dinner\`: 晚餐吃什麼
4️⃣ \`!開台\`: 幫你開台, 但是亦凡很沒用, 只會改 Discord Channel Name, 注意每 10 分鐘只能改 2 次
5️⃣ \`!關台\`: 幫你關台, 但是亦凡很沒用, 只會改 Discord Channel Name, 注意每 10 分鐘只能改 2 次
6️⃣ \`cn [頻道名稱]\`: 幫你改 Discord Channel Name, 注意每 10 分鐘只能改 2 次
      `);
      break;
    }
    case 'dinner': {
      const dinner = getDinner();
      await msgInstance.channel.send(`${dinner.title} \n ${dinner.url}`);
      break;
    }
    case '!開台': {
      console.log('開台');
      const time = new Date();
      const reason = `change at ${time}`;
      console.log(reason);
      await msgInstance.channel.setName('🔴吳亦凡的家', reason);
      break;
    }
    case '!關台': {
      console.log('關台');
      const time = new Date();
      const reason = `change at ${time}`;
      console.log(reason);
      await msgInstance.channel.setName('吳亦凡的家', reason);
      break;
    }
  }
}

async function checkCommand({ msgContent, msgInstance }) {
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

  if (msgContent.startsWith('cn')) {
    const parsedContent = msgContent.split(' ');
    parsedContent.shift();
    const keyword = (parsedContent.join(' ')).trim();
    console.log(keyword);
    await msgInstance.channel.setName(keyword);
    return;
  }
}

client.on('ready', async () => {
  console.log('Discord webhook server ready.');
});

client.on('message', async (msgInstance) => {
  const msgContent = msgInstance.content.toLowerCase();
  try {
    await checkFullEqualCommand({ msgContent, msgInstance });
    await checkCommand({ msgContent, msgInstance });
  } catch (err) {
    console.log(err);
    await msgInstance.channel.send(err.message);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
