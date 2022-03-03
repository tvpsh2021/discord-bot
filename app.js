const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;
const app = express();
require('dotenv').config();

app.enable('trust proxy');
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/discord', require('./discord'));
require('./websocket');

app.get('/', (req, res) => {
  res.send('吳亦凡起床囉!');
});

app.get('/health', (req, res) => {
  res.json({
    message: 'ok'
  });
});

app.listen(PORT, () => {
  console.log('Discord api server ready.');
});
