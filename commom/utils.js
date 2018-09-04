let mongoose = require('./mongoose');

let utils = {
  // md5加密
  md5: function (str) {
    return require('crypto').createHash('md5').update(str).digest('hex');
  },

  // 创建指定collection的一个model实例
  createModelEntity: function (collection, entity) {
    let model = mongoose.model(collection);
    return new model(entity);
  }
};

module.exports = utils;
