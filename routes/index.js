let express = require('express');
// 返回一个路由的实例
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: '博客'});
});

module.exports = router;
