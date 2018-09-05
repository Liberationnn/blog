let express = require('express');
// 返回一个路由的实例
let router = express.Router();
let mongoose = require('../commom/mongoose');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('/article/list/1/3');
});

module.exports = router;
