/**
 * 数据操作模块， 只处理数据的CRUD
 * 职责：操作文件中的数据，只处理数据，不关心业务
 * 
 * 封装异步 API
 */

 var fs = require('fs');
 var dbPath = './db.json';

 /*
callback第一个参数error:
  成功是 null
  错误是 错误对象
callback第二个参数是结果
  成功是 数组
  错误是 undefined
*/

/**
 * 获取学生列表
 * @param  {Function} callback 回调函数
 */
 exports.find = function(callback) {
    fs.readFile(dbPath, 'utf8',  (err, data) => {
        if(err){
            return callback(err);
        }
       callback(null, JSON.parse(data).students);
    });
}

/**
 * 根据 id 获取学生信息对象
 * @param  {Number}   id       学生 id
 * @param  {Function} callback 回调函数
 */
exports.findById = function(id, callback) {
    fs.readFile(dbPath, 'utf8',  (err, data) => {
        if(err){
            return callback(err);
        }
        var students = JSON.parse(data).students;
        var stu = students.find( (item) => {    //es6, 当满足条件时，终止遍历并返回遍历项
            return item.id == id
        });
       callback(null, stu);
    });
}

/**
 * 添加保存学生
 * @param  {Object}   student  学生对象
 * @param  {Function} callback 回调函数
 */
exports.save = function(student, callback){
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if(err){
            return callback(err);
        }
        var students = JSON.parse(data).students;
        student.id = students[students.length-1].id + 1;
        students.push(student);
        // 把对象数据转换为字符串
        var fileData = JSON.stringify({ students: students });
        fs.writeFile(dbPath, fileData, (err) => {
            if(err){
                return callback(err);
            }
        callback(null);   //成功就没错， 失败的错误对象是null
        });
    }); 
}

/**
 * 更新学生
 */
exports.updateById = function(student, callback){
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if(err){
            return callback(err);
        }
        var students = JSON.parse(data).students;
        // EcmaScript 6 中的一个数组方法：find
        // 需要接收一个函数作为参数
        // 当某个遍历项符合 item.id === student.id 条件的时候，find 会终止遍历，同时返回遍历项
        var stu = students.find( (item) => {    //es6, 当满足条件时，终止遍历并返回遍历项
            return item.id == student.id
        });
        //遍历拷贝对象
        student.id = parseInt(student.id);
        for(var key in student){
            stu[key] = student[key];
        }
        var fileData = JSON.stringify({ students: students });
        fs.writeFile(dbPath, fileData, (err) => {
            if(err){
                return callback(err);
            }
        callback(null);   //成功就没错， 失败的错误对象是null
        });
    });
}

/**
 * 删除学生
 */
exports.deleteById = function(id, callback){
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if(err){
            return callback(err);
        }
        var students = JSON.parse(data).students;
        var deleteId = students.findIndex( (item) => {    //es6, 当满足条件时，终止遍历并返回遍历项下标
            return item.id == +(id)
        });
        //遍历拷贝对象
        students.splice(deleteId, 1);
        var fileData = JSON.stringify({ students: students });
        fs.writeFile(dbPath, fileData, (err) => {
            if(err){
                return callback(err);
            }
        callback(null);   //成功就没错， 失败的错误对象是null
        });
    });
}
