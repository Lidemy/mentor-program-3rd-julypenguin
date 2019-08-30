const db = require('../db');

const shortUrlModel = {

  getUrl: (shortUrl, cb) => {
    db.query(`
      SELECT *
      FROM julypenguin_short_url
      WHERE short_url = ?
    `, [shortUrl],
    (err, results) => {
      if (err) return cb(err);
      return cb(null, results[0]);
    });
  },

  setShort: (url, shortUrl, cb) => {
    db.query(`
      INSERT INTO julypenguin_short_url(url, short_url)
      VALUES (?, ?)
    `, [url, shortUrl],
    (err, results) => {
      if (err) return cb(err);
      return cb(null, results[0]);
    });
  },
};

module.exports = shortUrlModel;
