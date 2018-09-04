let mongoose = require('mongoose');
let settings = require('./settings');

mongoose.connect(settings.dbUrl, {useNewUrlParser: true}, (err, db) => {
  if (err) {
    console.log('数据库连接失败: ' + err);
  } else {
    console.log('数据库连接成功');
  }
});

// 创建模板的方法
function createModel(collection, schema) {
  mongoose.model(collection, new mongoose.Schema(schema, {collection}));
}

// 创建user的模板
createModel('user', {
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  avatar: {type: String, required: true}
});

// 创建article的模板
createModel('article', {
  title: {type: String, required: true},
  content: {type: String, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  createAt: {type: Date, default: Date.now()}
});

module.exports = mongoose;