const bcrypt = require('bcrypt');
const { User } = require('../models');

const saltRounds = 10;
const regex = /\S/;

const userController = {
  register: (req, res) => {
    res.render('register');
  },

  handleRegister: (req, res, next) => {
    const { username, password, nickname } = req.body;
    if (!regex.test(username) || !regex.test(password) || !regex.test(nickname)) {
      req.flash('errorMessage', '還沒填完唷！');
      return next();
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        req.flash('errorMessage', err.toString());
        return next();
      }
      User.create({
        username,
        nickname,
        password: hash,
      }).then((user) => {
        req.session.userId = user.id;
        req.session.nickname = user.nickname;
        res.redirect('/');
      }).catch(() => {
        req.flash('errorMessage', '已有相同帳號註冊過囉！');
        return next();
      });
      return false;
    });
    return false;
  },

  login: (req, res) => {
    res.render('login');
  },

  handleLogin: (req, res, next) => {
    const { username, password } = req.body;

    if (!regex.test(username) || !regex.test(password)) {
      req.flash('errorMessage', '還沒填完唷！');
      return next();
    }

    User.findOne({
      where: {
        username,
      },
    }).then((user) => {
      if (!user) {
        req.flash('errorMessage', '帳號或密碼錯誤');
        return next();
      }
      bcrypt.compare(password, user.password, (error, isSuccess) => {
        if (error || !isSuccess) {
          req.flash('errorMessage', '帳號或密碼錯誤');
          return next();
        }
        req.session.userId = user.id;
        req.session.nickname = user.nickname;
        res.redirect('/');
        return false;
      });
      return false;
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      return next();
    });
    return false;
  },

  handleLogout: (req, res) => {
    req.session.userId = null;
    res.redirect('/');
  },
};

module.exports = userController;
