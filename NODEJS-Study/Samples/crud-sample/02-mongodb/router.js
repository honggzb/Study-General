var express = require('express');
var router = express.Router();

var Student = require('./student')

router.get('/students',  function (req, res) {
    Student.find(function (err, students) {
        if(err){
            return res.status(500).send('Server error');
        }
        res.render('index.html', { 
            fruits: ['苹果','香蕉','橘子'],
            students: students
        })
    });
});

router.get('/students/new', (req,res) => {
    res.render('new.html');  
});

router.post('/students/new', (req,res) => {
    //1) 获取表单数据
    var student = req.body;
    
    //2) 处理
    new Student(req.body).save((err) => {    //1) change 1: using new
        if(err){
            return res.status(500).send('Server error');
        }
        //3) 发送响应
        res.redirect('/students');
    });
});

router.get('/students/edit', (req,res) => {
    // 此处是字符串， 不用转换为数字
    Student.findById(req.query.id.replace(/"/g, ''), (err, student) => {
        console.log(req.query.id);
        if(err){
            return res.status(500).send('Server error');
        }
        res.render('edit.html', {
            student: student
        });
    })
});

router.post('/students/edit', (req,res) => {
    //1) 获取表单数据
    var student = req.body;
    //2) 处理
    Student.findByIdAndUpdate(req.body.id.replace(/"/g, ''), student, (err) =>{
        if(err){
            return res.status(500).send('Server error');
        }
        res.redirect("/students");
    })
});

router.get('/students/delete', (req,res) => {
    Student.findByIdAndRemove(req.query.id.replace(/"/g, ''), (err) => {
        if(err){
            return res.status(500).send('Server error');
        }
        res.redirect("/students");
    }) 
});

module.exports = router;
