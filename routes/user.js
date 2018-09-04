let express = require('express');
// 返回一个路由的实例
let router = express.Router();
let utils = require('../commom/utils');
let mongoose = require('../commom/mongoose');
let {isLogin, noLogin} = require('../commom/authority');

// 注册
router.get('/register', noLogin, function (req, res, next) {
  res.render('user/register', {title: '注册'});
});
router.post('/register', noLogin, function (req, res, next) {
  let user = req.body;

  // 检查两次输入密码是否一致
  if (user.password !== user.rePassword) {
    req.session.error = '两次输入密码不一致';
    return res.redirect('back'); //回退到上一个页面
  }

  delete user.rePassword;
  user.password = utils.md5(user.password);
  user.avatar = 'https://secure.gravatar.com/avatar/' + utils.md5(user.email) + '?s=48';
  utils.createModelEntity('user', user).save((err, doc) => {
    if (err) {
      req.session.error = '注册失败';
      return res.redirect('back'); //回退到上一个页面
    }

    req.session.user = doc;
    req.session.success = '注册成功';
    res.redirect('/'); //回退到首页
  });
});

// 登录
router.get('/login', noLogin, function (req, res, next) {
  res.render('user/login', {title: '登录'});
});
router.post('/login', noLogin, function (req, res, next) {
  let user = req.body;

  // 检查是否输入用户名和密码
  if (!user.username.trim() || !user.password.trim()) {
    req.session.error = '请将用户名和密码填写完整';
    return res.redirect('back');
  }

  // 检查用户名密码是否正确
  user.password = utils.md5(user.password);
  let model = mongoose.model('user');
  model.findOne(user, (err, doc) => {
    if (err) {
      req.session.error = '登录失败，请重试';
      return res.redirect('back');
    }

    if (!doc) {
      req.session.error = '用户名密码错误，请重试';
      return res.redirect('back');
    }

    req.session.user = doc;
    req.session.success = '登陆成功';
    res.redirect('/');
  });
});

// 注销
router.get('/logout', isLogin, function (req, res, next) {
  req.session.user = null;
  req.session.success = '注销成功';
  res.redirect('/');
});

module.exports = router;
