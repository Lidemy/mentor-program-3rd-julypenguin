const bcrypt = require('bcrypt');
const userModel = require('../models/user');

const saltRounds = 10;
const userController = {

  authorization: (req, res) => {
    res.render('authorization');
  },

  apiCheckuser: (req, res) => {
    userModel.getMe(req.session.username, (err, user) => {
      res.json(user);
    });
  },

  apiUsers: (req, res) => {
    userModel.getUsers((err, users) => {
      res.json(users);
    });
  },

  handleRegister: (req, res) => {
    const { username, password, nickname } = req.body;
    if (!username || !password || !nickname) {
      return res.redirect('/');
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return console.log(err);

      userModel.setUser(
        username,
        nickname,
        hash,
        (error) => {
          if (error) return console.log('register', error);

          req.session.username = username;
          return res.redirect('/');
        },
      );
      return false;
    });
    return false;
  },

  handleLogin: (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.redirect('/');
    }

    userModel.getPassword(username, (err, myPassword) => {
      if (err) return console.log(err);

      if (!myPassword) {
        return res.redirect('/');
      }

      bcrypt.compare(password, myPassword.password, (error, isSuccess) => {
        if (error) console.log(error);
        if (!isSuccess) return res.json({ success: false });

        req.session.username = username;
        return res.redirect('/');
      });
      return false;
    });
    return false;
  },

  handleLogout: (req, res) => {
    req.session.username = null;
    res.redirect('/');
  },

  updateAuthorization: (req, res) => {
    const { username, authority } = req.body;

    userModel.getMe(req.session.username, (err, user) => {
      if (user[0].classification !== 'super_admin') return;
      userModel.updateAuthorization(authority, username, (error, { affectedRows }) => {
        if (affectedRows) {
          res.json({ success: true });
        }
      });
    });
  },
};

module.exports = userController;
