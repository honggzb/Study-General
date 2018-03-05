const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8002;
const app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');
// if template is html
// app.set('view engine', 'html');
// app.engine('html', require('hbs').__express); 
app.use(express.static(__dirname+'/public'));    //remove for Middleware in line 26

//Middleware
app.use((req,res,next) => {  
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log+'\n', (err) => {
    if(err){
      console.log('Unable to append server.log');
    }
  })
  next();
});

// app.use((req,res,next) => {          //must remove app.use(express.static(__dirname+'/public'));
//   res.render('maintenance.hbs');
// })

//hbs helper
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getUTCFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

app.get('/', (req, res)=> {
  //res.send('Hello Express!')
  //res.send({name: 'Andrew', Likes : ['Biking','Cities']});
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  })
});

app.get('/about',(req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res)=> {
  res.send({errorMessage: 'Unable to handle request'});
});

const server = app.listen(8002, "localhost", () => {
  console.log(`服务器已经在${port}端口启动`);
});
