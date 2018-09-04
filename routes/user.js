let express = require('express');
// 返回一个路由的实例
let router = express.Router();
let util = require('../util');

// 注册
router.get('/register', function (req, res, next) {
  res.render('user/register', {title: '注册'});
});
router.post('/register', function (req, res, next) {
  let user = req.body;

  if (user.password !== user.rePassword) {
    req.session.error = '两次输入密码不一致';
    return res.redirect('back'); //回退到上一个页面
  }

  delete user.rePassword;
  user.password = util.md5(user.password);
  user.avatar = 'https://secure.gravatar.com/avatar/' + util.md5(user.email) + '?s=48';
  util.createModelEntity('User', user).save((err, doc) => {
    if (err) {
      req.session.error = '注册失败';
      res.redirect('back'); //回退到上一个页面
    } else {
      req.session.user = doc;
      req.session.success = '注册成功';
      res.redirect('/'); //回退到首页
    }
  });
});

// 登录
router.get('/login', function (req, res, next) {
  res.render('user/login', {title: '登录'});
});
router.post('/login', function (req, res, next) {
  req.session.success = '登陆成功';
  res.redirect('/');
});

// 注销
router.get('/logout', function (req, res, next) {
  req.session.user = null;
  req.session.success = '注销成功';
  res.redirect('/');
});

module.exports = router;
