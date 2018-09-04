let express = require('express');
let router = express.Router();
let utils = require('../commom/utils');
let {isLogin, noLogin} = require('../commom/authority');

// 发表文章
router.get('/add', isLogin, function (req, res, next) {
  res.render('article/add', {title: '发表文章'});
});
router.post('/add', isLogin, function (req, res, next) {
  let article = req.body;
  article.user = req.session.user._id;

  if (!article.title.trim() || !article.content.trim()) {
    req.session.error = '请将标题和内容填写完整';
    return res.redirect('back');
  }

  utils.createModelEntity('article', article).save((err, doc) => {
    if (err) {
      req.session.error = '发表失败';
      return res.redirect('back');
    }

    req.session.success = '发表成功';
    res.redirect('/');
  });
});

module.exports = router;