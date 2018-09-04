let express = require('express');
let router = express.Router();

// 发表文章
router.get('/add', function (req, res, next) {
  res.render('article/add', {title: '发表文章'});
});
router.post('/add', function (req, res, next) {
  req.session.success = '发表成功';
  res.redirect('/');
});

module.exports = router;