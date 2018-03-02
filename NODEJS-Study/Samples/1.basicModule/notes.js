console.log('Starting notes.js');
//console.log(module);

const fs = require('fs');
//module.exports.age = 25;
var notes;

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  } 
};

var saveNotes = (notes)=> {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote =  (title, body) => {
  //console.log('addNote');
  var notes = fetchNotes();
  var note = {title, body};
  var duplicateNote = notes.filter((note) => note.title === title);
  if(duplicateNote.length === 0){
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll =  () => {
  console.log('Getting all notes');
  return fetchNotes();
  //notes.forEach((note) => console.log("note title: "+note.title+", note body: "+note.body));
  //notes.forEach((note) => logNote(note));
  //console.log('Getting all notes', notes);
};

var getNote =  (title) => {
  console.log('Getting note', title);
};

var removeNote =  (title) => {
  //console.log('Removing note', title);
  var notes = fetchNotes();
  var filterNotes = notes.filter((note) => note.title !== title);
  saveNotes(filterNotes);
  return notes.length!==filterNotes.length;
};

var logNote = (note) => {
  console.log('---');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
}

module.exports ={
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
}
