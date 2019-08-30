const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./db');

const app = express();
const port = 3002;

const shortUrlController = require('./controllers/shortUrl');

app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', shortUrlController.index);
app.post('/short', shortUrlController.short);
app.get('/:short', shortUrlController.get);

app.listen(port, () => {
  db.connect();
  console.log('Example app listening on port 5001!');
});
