let express = require('express');
// 返回一个路由的实例
let router = express.Router();
let mongoose = require('../commom/mongoose');

/* GET home page. */
router.get('/', function (req, res, next) {
  mongoose.model('article').find({}).populate('user').exec((err, docs) => {
    res.render('index', {articles: docs});
  });
});

module.exports = router;
