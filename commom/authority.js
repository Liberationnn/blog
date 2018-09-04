// 已登录权限
let isLogin = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = '请登录后再进行操作';
    res.redirect('/user/login');
  }
};

// 未登录权限
let noLogin = function (req, res, next) {
  if (!req.session.user) {
    next();
  } else {
    req.session.error = '请不要重复登录';
    res.redirect('/');
  }
};

module.exports = {isLogin, noLogin};
