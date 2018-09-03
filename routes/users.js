let express = require('express');
// 返回一个路由的实例
let router = express.Router();

// 注册
router.get('/reg', function (req, res, next) {
  res.render('user/reg', {title: '注册'});
});
router.post('/reg', function (req, res, next) {
  res.redirect('/');
});

// 登录
router.get('/login', function (req, res, next) {
  res.render('user/login', {title: '登录'});
});
router.post('/login', function (req, res, next) {
  res.redirect('/');
});

// 注销
router.get('/logout', function (req, res, next) {
  // res.render('user/logout', {title: '注销'});
  res.redirect('/');
});

module.exports = router;
