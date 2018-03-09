const express = require('express');

var app = express();

app.get('/', (req, res) => {
  res.status(404).send({
    error: 'Page not Found',
    name: 'Adam'
  });
});

app.get('/users', (req,res) => {
  res.send([{
    name: "Mike",
    age: 25
  },{
    name: "Andrew",
    age: 32
  },{
    name: "Jen",
    age: 24
  }]);
});

if(!module.parent) app.listen(3000);   //avoid twice listen in test case

module.exports.app = app;   //for mocha test
