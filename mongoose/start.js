'use strict'
const mongoose = require('mongoose')
// 连接mongodb
mongoose.connect('mongodb://localhost/test')
// 实例化连接对象
const db = mongoose.connection
db.on('error', console.error.bind(console, '连接错误：'))
db.once('open', (callback) => {
  console.log('MongoDB连接成功！！')
})
// 创建schema
const classSchema = new mongoose.Schema({
    name: String,
    age: Number
})
classSchema.statics.findByName = function (name,cb) {
  return this.find({ name: name }, cb);
}
// 创建model
const classModel = mongoose.model('newClass', classSchema) // newCollection为创建或选中的集合
// 创建entity

// 增删改查
// 增（通过model，可以传入一个json对象）
// var doc = [
//     {
//         name: '小军',
//         age: 11
//     },
//     {
//         name: '小芳',
//         age: 11
//     },
//     {
//         name: '小明',
//         age: 11
//     },
//     {
//         name: '小丽',
//         age: 12
//     }
// ]
// classModel.create(doc, function(error){
//     if(error) {
//         console.log(error);
//     } else {
//         console.log('save ok');
//     }
//     // 关闭数据库链接
//     db.close();
// })
// 删
// classModel.remove({name: '小军'}, (err, result) => {
//     if(err) return console.log(err)
//     console.log(result.result)
// })
// 改
// classModel.update({name: '小明'}, {age: 21}, (err, result) => {
//     if(err) return console.log(err)
//     console.log(result)
// })
// 查
// classModel.find({name: '小明'}, (err, result) => {
//     if(err) return console.log(err)
//     console.log(result)
// })
// classModel.findByName('小明', (err, result) => {
//     if(err) return console.log(err)
//     console.log(result)
// })
