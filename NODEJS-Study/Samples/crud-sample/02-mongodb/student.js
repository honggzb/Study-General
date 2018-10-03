/**
 * 数据操作模块， 只处理数据的CRUD
 * 职责：操作文件中的数据，只处理数据，不关心业务
 * 
 * 封装异步 API
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test')

var Schema = mongoose.Schema; 

var studentSchema = new Schema({  
    name:   {type: String, required: true },  
    gender: {type: Number, enum: [0,1], default: 0 },  
    age:    {type: Number },   
    hobbies: {type: String}
});

// 直接导出模型构造函数
module.exports = mongoose.model('Student', studentSchema)