let express = require('express');
let router = express.Router();
let utils = require('../commom/utils');
let mongoose = require('../commom/mongoose');
let {isLogin, noLogin} = require('../commom/authority');
let multer = require('multer'); //处理文件上传
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploads/'); //文件上传路径
  },
  filename: function (req, file, cb) {
    let [name, ext] = file.originalname.split('.');
    cb(null, name + '-' + Date.now() + '.' + ext); //文件名
  }
});
let upload = multer({storage: storage});

// 查询结果分页显示
router.get('/list/:page/:number', function (req, res, next) {
  let page = parseInt(req.params.page);
  let number = parseInt(req.params.number);
  let {keyword} = req.query;

  let query = {};
  if (keyword) {
    query['title'] = new RegExp(keyword, 'i');
  }
  mongoose.model('article').count(query, function (err, count) {
    mongoose.model('article').find(query).skip((page - 1) * number).limit(number).sort({createAt: -1}).populate('user').exec(function (err, articles) {
      res.render('index', {
        articles,
        keyword,
        page,
        number,
        totalPage: Math.ceil(count / number)});
    });
  });
});

// 发表文章
router.get('/add', isLogin, function (req, res, next) {
  res.render('article/add', {title: '发表文章'});
});
router.post('/add', isLogin, upload.single('img'), function (req, res, next) {
  let article = req.body;

  if (!article.title.trim() || !article.content.trim()) {
    req.session.error = '请将标题和内容填写完整';
    return res.redirect('back');
  }

  article.user = req.session.user._id;
  if (req.file) {
    article.img = '/uploads/' + req.file.filename;
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

// 文章详情页
router.get('/detail/:_id', function (req, res, next) {
  let _id = req.params._id;
  mongoose.model('article').findById(_id, (err, doc) => {
    if (err || !doc) {
      req.session.error = '文章不存在';
      return res.redirect('back');
    }
    res.render('article/detail', {article: doc});
  });
});

// 编辑文章
router.get('/edit/:_id', function (req, res, next) {
  let _id = req.params._id;
  mongoose.model('article').findById(_id, (err, doc) => {
    if (err || !doc) {
      req.session.error = '文章不存在';
      return res.redirect('back');
    }
    res.render('article/edit', {article: doc});
  });
});

// 更新文章
router.post('/edit/save', isLogin, upload.single('img'), function (req, res, next) {
  let {_id, title, content, img} = req.body;
  let article = img ? {title, content, img} : {title, content};

  if (!title.trim() || !content.trim()) {
    req.session.error = '请将标题和内容填写完整';
    return res.redirect('back');
  }
  if (req.file) {
    article.img = '/uploads/' + req.file.filename;
  }
  console.log(img);
  mongoose.model('article').findByIdAndUpdate(_id, article, function (err, doc) {
    if (err || !doc) {
      req.session.error = '更新文章失败';
      return res.redirect('back');
    }
    res.redirect('/article/detail/' + _id);
  });
});

// 删除文章
router.get('/delete/:_id', function (req, res, next) {
  let _id = req.params._id;
  mongoose.model('article').findByIdAndRemove(_id, function (err, result) {
    console.log(_id);
    console.log(result);
    if (err) {
      req.session.error = '删除文章失败';
      return res.redirect('back');
    }
    req.session.success = '删除文章成功';
    res.redirect('/');
  });
});

module.exports = router;