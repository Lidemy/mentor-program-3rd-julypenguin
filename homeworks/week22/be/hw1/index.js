const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./db');

const app = express();
const port = 5001;

const userController = require('./controllers/user');
const commentController = require('./controllers/comment');

app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', commentController.index);
app.get('/admin', commentController.admin);
app.get('/authorization', userController.authorization);

app.get('/api', commentController.apiContent);
app.get('/api/checkuser', userController.apiCheckuser);
app.get('/api/users', userController.apiUsers);

app.post('/api/comments', commentController.create);
app.patch('/api/comments/:id', commentController.update);
app.delete('/api/comments/:id', commentController.destroy);
app.post('/api/thumbsup', commentController.thumbsup);

app.post('/api/register', userController.handleRegister);
app.post('/api/login', userController.handleLogin);
app.get('/api/logout', userController.handleLogout);
app.patch('/api/authorization', userController.updateAuthorization);

app.listen(port, () => {
  db.connect();
  console.log('Example app listening on port 5001!');
});
