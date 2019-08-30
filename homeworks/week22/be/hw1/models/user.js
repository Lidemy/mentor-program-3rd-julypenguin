const db = require('../db');

const userModel = {
  getPassword: (username, cb) => {
    db.query(`
      SELECT password
      FROM julypenguin_users
      WHERE username = ?
    `, [username],
    (err, results) => {
      if (err) return cb(err);
      return cb(null, results[0]);
    });
  },

  getMe: (username, cb) => {
    db.query(`
      SELECT nickname, username, user_classification classification
      FROM julypenguin_users
      WHERE username = ?
    `, [username],
    (err, results) => {
      if (err) return cb(err);
      return cb(null, results);
    });
  },


  getUsers: (cb) => {
    db.query(`
      SELECT U.username, U.nickname, U.user_classification classification, COUNT(C.content) content
      FROM julypenguin_users U
      LEFT JOIN julypenguin_comments C
      ON C.username = U.username
      GROUP BY U.username
    `,
    (err, results) => {
      if (err) return cb(err);
      return cb(null, results);
    });
  },

  setUser: (nickname, username, password, cb) => {
    db.query(`
      INSERT INTO julypenguin_users(nickname, username, password)
      VALUES (?, ?, ?)
    `, [nickname, username, password],
    (err, results) => {
      if (err) return cb(err);
      return cb(null, results);
    });
  },

  updateAuthorization: (classification, username, cb) => {
    db.query(`
      UPDATE julypenguin_users
      SET user_classification = ?
      WHERE username = ?
    `, [classification, username],
    (err, results) => {
      if (err) return cb(err);
      return cb(null, results);
    });
  },
};

module.exports = userModel;
