const commentModel = require('../models/comment');
const userModel = require('../models/user');

const commentController = {

  index: (req, res) => {
    res.render('index');
  },

  admin: (req, res) => {
    res.render('admin');
  },

  create: (req, res) => {
    const { username } = req.session;
    const { content, layer, id } = req.body;

    if (!username) {
      return res.json({ success: false });
    }
    if (!content) {
      return res.json({ success: false });
    }

    commentModel.setComment(username, content, layer, id, (err, comment) => {
      if (comment) return res.json({ success: true });
      return res.json({ success: false });
    });
    return false;
  },

  update: (req, res) => {
    const { username } = req.session;
    const { id } = req.params;
    const { content } = req.body;
    let isMyContent = false;
    let isAdmin = false;
    commentModel.getMyComment(id, username, (err, myContent) => {
      if (myContent) {
        isMyContent = true;
      }
    });
    userModel.getMe(username, (err, user) => {
      if (user[0].classification !== 'normal') {
        isAdmin = true;
      }
    });
    if (!isMyContent && isAdmin) return false;
    commentModel.updateComment(content, id, (err, { affectedRows }) => {
      if (affectedRows) return res.json({ success: true });
      return res.json({ success: false });
    });
    return false;
  },

  destroy: (req, res) => {
    const { username } = req.session;
    const { id } = req.params;
    let isMyContent = false;
    let isAdmin = false;
    commentModel.getMyComment(id, username, (err, myContent) => {
      if (myContent) {
        isMyContent = true;
      }
    });
    userModel.getMe(username, (err, user) => {
      if (user[0].classification !== 'normal') {
        isAdmin = true;
      }
    });

    if (!isMyContent && isAdmin) return false;
    commentModel.deleteComment(id, (err) => {
      if (err) return console.log(err);
      return res.json({ success: true });
    });
    return false;
  },

  apiContent: (req, res) => {
    commentModel.checkSubContent((err, content) => {
      res.json(content);
    });
  },

  thumbsup: (req, res) => {
    const { username } = req.session;
    const { id } = req.body;
    commentModel.getThumbsup(username, id, (err, thumbsup) => {
      if (thumbsup) {
        commentModel.deleteThumbsup(username, id, (error, { affectedRows }) => {
          if (error) console.log(error);
          if (affectedRows) return res.json({ success: true });
          return res.json({ success: false });
        });
      } else {
        commentModel.setThumbps(username, id, (error, { affectedRows }) => {
          if (error) console.log(error);
          if (affectedRows) return res.json({ success: true });
          return res.json({ success: false });
        });
      }
    });
  },
};

module.exports = commentController;
