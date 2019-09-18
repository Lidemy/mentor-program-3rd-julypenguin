const showdown = require('showdown');
const showdownHighlight = require('showdown-highlight');
const { Comment, User } = require('../models');

showdown.setFlavor('github');
const converter = new showdown.Converter({
  extensions: [showdownHighlight],
  openLinksInNewWindow: true,
  underline: true,
});

const regex = /\S/;

const commentController = {
  index: (req, res) => {
    Comment.findAll({
      include: User,
      order: [['id', 'DESC']],
    }).then((comments) => {
      res.render('index', {
        comments,
        converter,
      });
    });
  },

  comment: (req, res) => {
    Comment.findOne({
      include: User,
      where: {
        id: req.params.id,
      },
    }).then((comment) => {
      res.render('comment', {
        comment,
        converter,
      });
    });
  },

  about: (req, res) => {
    res.render('about');
  },

  writeComment: (req, res) => {
    res.render('writeComment');
  },

  add: (req, res, next) => {
    const { userId } = req.session;
    const { title, body } = req.body;

    if (!userId || !body || !title) {
      req.flash('errorMessage', '標題和內文都要寫唷！');
      return next();
    }

    Comment.create({
      UserId: userId,
      title,
      body,
    }).then(() => {
      res.redirect('/');
    }).catch((error) => {
      req.flash('errorMessage', error.toString());
      return next();
    });
    return false;
  },

  update: (req, res) => {
    const { id } = req.params;

    Comment.findOne({
      include: User,
      where: {
        id,
      },
    }).then((comment) => {
      res.render('update', {
        comment,
      });
    });
  },

  handleUpdate: (req, res, next) => {
    const { title, body } = req.body;
    const { id } = req.params;
    const { userId } = req.session;

    if (!userId) {
      req.flash('errorMessage', '請先登入');
      return next();
    }

    if (!regex.test(title) || !regex.test(body)) {
      req.flash('errorMessage', '標題和內文不能空白唷！');
      return next();
    }

    Comment.findOne({
      where: {
        id,
        UserId: userId,
      },
    }).then(comment => comment.update({
      title,
      body,
    })).then(() => {
      res.redirect(`/comments/${id}`);
    }).catch((error) => {
      req.flash('errorMessage', error.toString());
      return next();
    });
    return false;
  },

  handleDelete: (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.session;

    if (!userId) {
      req.flash('errorMessage', '請先登入');
      return next();
    }

    Comment.findOne({
      where: {
        id,
        UserId: userId,
      },
    }).then(comment => comment.destroy())
      .then(() => {
        res.redirect('/');
      }).catch((error) => {
        req.flash('errorMessage', error.toString());
        return next();
      });

    return false;
  },
};

module.exports = commentController;
