let express = require('express');
let router = express.Router();

// 添加文章
router.get('/add', function (req, res, next) {
  res.render('article/add', {title: '发表文章'});
});
router.post('/add', function (req, res, next) {
  res.redirect('/');
});

module.exports = router;