var express = require('express');
var router = express.Router();

var Student = require('./student')

router.get('/students',  function (req, res) {
    //res.send("hello")
    //指定utf8后就不用toString()
    // fs.readFile('./db.json', 'utf8', (err,data)=>{
    //         if(err){
    //             return res.status(500).send('Server error');
    //         }
    //         res.render('index.html', { 
    //             fruits: ["apple", "banana","orange" ],
    //             students: JSON.parse(data).students
    //         })
    // });
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
    
router.get('/students', (req,res) => {
       
});
    
router.get('/students/new', (req,res) => {
    res.render('new.html');  
});

router.post('/students/new', (req,res) => {
    //1) 获取表单数据
    var student = req.body;
    //2) 处理
    Student.save(student, (err) => {
        if(err){
            return res.status(500).send('Server error');
        }
        //3) 发送响应
        res.redirect('/students');
    });
});

router.get('/students/edit', (req,res) => {
    Student.findById(+(req.query.id), (err, student) => {
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
    Student.updateById(student, (err) =>{
        if(err){
            return res.status(500).send('Server error');
        }
        res.redirect("/students");
    })
});

router.get('/students/delete', (req,res) => {
    Student.deleteById(req.query.id, (err) => {
        if(err){
            return res.status(500).send('Server error');
        }
        res.redirect("/students");
    }) 
});

module.exports = router;
