const db = require('../db');

const commentController = {
  getMyComment: (id, username, cb) => {
    db.query(`
      SELECT *
      FROM julypenguin_comments
      WHERE id = ? AND username = ?
    `, [id, username],
    (err, results) => {
      if (err) return cb(err);
      return cb(null, results[0]);
    });
  },

  getThumbsup: (username, commentId, cb) => {
    db.query(`
      SELECT username
      FROM julypenguin_thumbsup
      WHERE username = ? AND comment_id = ?
    `, [username, commentId],
    (err, results) => {
      if (err) return cb(err);
      return cb(null, results[0]);
    });
  },

  setComment: (username, content, layer, parentId, cb) => {
    db.query(`
      INSERT INTO julypenguin_comments(username, content, layer, parent_id)
      VALUES (?, ?, ?, ?)
    `, [username, content, layer, parentId],
    (err, results) => {
      if (err) return cb(err);
      return cb(null, results);
    });
  },

  setThumbps: (username, commentId, cb) => {
    db.query(`
      INSERT INTO julypenguin_thumbsup(username, comment_id)
      VALUES (?, ?)
    `, [username, commentId],
    (err, results) => {
      if (err) return cb(err);
      return cb(null, results);
    });
  },

  updateComment: (content, id, cb) => {
    db.query(`
      UPDATE julypenguin_comments
      SET content = ?
      WHERE id = ?
    `, [content, id],
    (err, results) => {
      if (err) return cb(err);
      return cb(null, results);
    });
  },

  deleteComment: (id, cb) => {
    db.query(`
      DELETE FROM julypenguin_comments
      WHERE id = ?
    `, [id],
    (err, results) => {
      if (err) return cb(err);
      return cb(null, results);
    });
  },

  deleteThumbsup: (username, commentId, cb) => {
    db.query(`
      DELETE FROM julypenguin_thumbsup
      WHERE username = ? AND comment_id = ?
    `, [username, commentId],
    (err, results) => {
      if (err) return cb(err);
      return cb(null, results);
    });
  },

  checkSubContent: (cb) => {
    db.query(`
      SELECT C.id, C.content, C.layer, C.parent_id, C.created_at, U.nickname, U.username,
        (SELECT count(T.comment_id)
        FROM julypenguin_thumbsup T
        WHERE C.id = T.comment_id) thumbsUpCount
      FROM julypenguin_comments C LEFT JOIN julypenguin_users U
      ON C.username = U.username
      ORDER BY created_at DESC
    `,
    (err, results) => {
      if (err) return cb(err);
      return cb(null, results);
    });
  },
};

module.exports = commentController;
