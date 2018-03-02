console.log('Starting App.');

const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const notes = require('./notes.js');
const yargs = require('yargs');

const titleOptions ={describe: 'Title of Note', demand: true, alias: 't'};
const bodyOptions ={describe: 'Body of Note', demand: true, alias: 'b'};
//const argv = yargs.argv;
const argv = yargs
  .command('add', 'Add a new note', { title: titleOptions, body: bodyOptions })
  .command('list', 'list all notes')
  .command('read', 'Read a new note', { title: titleOptions })
  .help().argv;
//node app.js add -t="flag title" -b="new body"
//node app.js add --title="flag title" --body="new body"

//os api
//var user = os.userInfo();
//console.log(user);

// var res = notes.addNote();
// console.log(res);
//console.log('results: ', notes.add(9, -2));

// fs.appendFile('greetings.txt', `hello ${user.username}! you are ${notes.age}.`, (err) => {
//   if (err) {
//     console.log('Uable to write to file!');
//   }
// });

//option one
//fs.appenFileSync('greeting.txt', 'hello ${user.username}.');

//命令行：node app add\list\read\remove
// node app remove --title="secrets 2"
var command = process.argv[2];
console.log('Command: ', command);
//console.log('Process: ', process.argv);
//console.log('yargs: ', argv);

if(command === 'add'){
  //console.log('Adding new note');
  notes.addNote(argv.title, argv.body);
}else if(command === 'list'){
  //console.log("Listing all notes");
  var allNotes = notes.getAll();
  allNotes.forEach(note => notes.logNote(note));
}else if(command === 'read'){
    //console.log('Reading note');
    notes.getNote(argv.title);
}else if(command === 'remove'){
    //console.log('Removing note');
    notes.removeNote(argv.title);
}else{
  console.log("command not recognized.");
}
