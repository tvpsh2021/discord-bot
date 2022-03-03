const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;
const app = express();
require('dotenv').config();

app.enable('trust proxy');
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.use('/discord', require('./discord'));
require('./websocket');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/index.html'));
});

app.get('/health', (req, res) => {
  res.json({
    message: 'ok'
  });
});

app.listen(PORT, () => {
  console.log('Discord api server ready.');
});
