const bcrypt = require('bcrypt');
const shortUrlModel = require('../models/shortUrl');

const saltRounds = 10;
const shortUrlController = {

  index: (req, res) => {
    res.render('index');
  },

  short: (req, res) => {
    const { url } = req.body;
    bcrypt.hash(url, saltRounds, (err, hash) => {
      if (err) return console.log('bcrypt_err', err);
      const shortUrl = hash.slice(-8);
      shortUrlModel.getUrl(shortUrl, (error, OriUrl) => {
        if (OriUrl) return; // 希望縮網址重複時能重跑一次，但不知道怎麼重新呼叫 short
        shortUrlModel.setShort(url, shortUrl, (toerr) => {
          if (toerr) console.log(toerr);
          res.render('short', {
            shortUrl,
          });
        });
      });
      return false;
    });
  },

  get: (req, res) => {
    const { short } = req.params;
    shortUrlModel.getUrl(short, (err, { url }) => {
      res.redirect(url);
    });
  },
};

module.exports = shortUrlController;
