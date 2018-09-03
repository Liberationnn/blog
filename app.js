let createError = require('http-errors');
let express = require('express');
let path = require('path'); //处理路径
let cookieParser = require('cookie-parser'); //处理cookie
let logger = require('morgan'); //处理日志

let indexRouter = require('./routes/index'); //根路由
let usersRouter = require('./routes/users'); //用户路由
let articleRouter = require('./routes/article'); //文章路由

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); //设置模板存放路径
app.set('view engine', 'ejs'); //设置模板引擎

app.use(logger('dev')); //指定路径输出的格式
app.use(express.json()); //处理JSON 通过Content-Type来判断是否由自己来处理
app.use(express.urlencoded({extended: false})); //处理form-urlencoded
app.use(cookieParser()); //处理cookie 把请求头中的cookie转成对象，加入一个cookie函数的属性
app.use(express.static(path.join(__dirname, 'public'))); //静态文件服务

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/article', articleRouter);

// catch 404 and forward to error handler
// 捕获404错误并转发到错误处理中间件
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500); //设置响应状态码
  res.render('error'); //渲染模板
});

module.exports = app;
