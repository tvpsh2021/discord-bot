const express = require('express');
const Discord = require('discord.js');
const { response } = require('../lib');
const router = express.Router();
require('dotenv').config();

const webhookClients = {};

function prepareWebhookClient({ webhookID, webhookToken }) {
  if (!webhookClients[webhookID]) {
    webhookClients[webhookID] = new Discord.WebhookClient(webhookID, webhookToken);
  }

  return webhookClients[webhookID];
}

router.post('/send-msg', async (req, res) => {
  try {
    const webhookID = req.headers['discord-webhook-id'];
    const webhookToken = req.headers['discord-webhook-token'];
    const hook = prepareWebhookClient({ webhookID, webhookToken });
    const { message } = req.body;
    hook.send(message);
    res.json(response({ message: 'ok' }));
  } catch (err) {
    console.error(err);
    res.json(response({ message: 'nok' }));
  }
});

module.exports = router;
