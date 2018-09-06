/**
 * 数据操作模块， 只处理数据的CRUD
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
 exports.find = function(callback) {
    fs.readFile(dbPath, 'utf8',  (err, data) => {
        if(err){
            return callback(err);
        }
       callback(null, JSON.parse(data).students);
    });
}

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

exports.save = function(student, callback){
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if(err){
            return callback(err);
        }
        var students = JSON.parse(data).students;
        student.id = students[students.length-1].id + 1;
        students.push(student);
        var fileData = JSON.stringify({ students: students });
        fs.writeFile(dbPath, fileData, (err) => {
            if(err){
                return callback(err);
            }
        callback(null);   //成功就没错， 失败的错误对象是null
        });
    }); 
}

exports.updateById = function(student, callback){
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if(err){
            return callback(err);
        }
        var students = JSON.parse(data).students;
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