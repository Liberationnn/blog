let mongoose = require('mongoose');
let settings = require('../settings');

mongoose.connect(settings.dbUrl, {useNewUrlParser: true}, (err, db) => {
  if (err) {
    console.log('数据库连接失败: ' + err);
  } else {
    console.log('数据库连接成功');
  }
});

// 创建User的模板，并存储起来
mongoose.model('User', new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  avatar: {type: String, required: true}
}, {
  collection: 'User'
}));

module.exports = mongoose;