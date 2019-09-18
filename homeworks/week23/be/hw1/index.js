const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = 3004;

const userController = require('./controllers/user');
const commentController = require('./controllers/comment');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());
app.use(express.static(`${__dirname}/public`));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

app.use((req, res, next) => {
  res.locals.userId = req.session.userId;
  res.locals.nickname = req.session.nickname;
  res.locals.errorMessage = req.flash('errorMessage');
  next();
});

function redirectBack(req, res) {
  res.redirect('back');
}

app.get('/', commentController.index);
app.get('/comments', commentController.index);
app.get('/comments/:id', commentController.comment);
app.get('/update-comments/:id', commentController.update);
app.post('/update-comments/:id', commentController.handleUpdate, redirectBack);
app.get('/delete-comments/:id', commentController.handleDelete, redirectBack);
app.get('/about', commentController.about);
app.get('/register', userController.register);
app.post('/register', userController.handleRegister, redirectBack);
app.get('/login', userController.login);
app.post('/login', userController.handleLogin, redirectBack);
app.get('/logout', userController.handleLogout);
app.get('/writeComment', commentController.writeComment);
app.post('/writeComment', commentController.add, redirectBack);

app.listen(port, () => {
  console.log('Example app listening on port 5001!');
});
