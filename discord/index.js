const express = require('express');
const Discord = require('discord.js');
const { response } = require('../lib');

const router = express.Router();

router.post('/send-msg', async (req, res) => {
  const webhookID = req.headers['discord-webhook-id'];
  const webhookToken = req.headers['discord-webhook-token'];
  const { message } = req.body;
  const hook = new Discord.WebhookClient(webhookID, webhookToken);
  hook.send(message);
  res.json(response({ message: 'ok' }));
});

module.exports = router;
