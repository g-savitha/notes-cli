const fs = require("fs");
const chalk = require("chalk");

const log = console.log;

const saveNotes = (notes) => {
  // convert js object to json and store it in a file
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};
const loadNotes = () => {
  try {
    //read json data from file and parse it into js object
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    return data;
  } catch (e) {
    return [];
  }
};
//add notes
const addNotes = (title, body) => {
  const notes = loadNotes();
  //Once you find the duplicate title stop the process and throw an error
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    log(chalk.inverse.bold.green("New note added!"));
  } else {
    log(chalk.inverse.bold.red("This note title is taken!"));
  }
};

//remove notes
const removeNotes = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notesToKeep.length < notes.length) {
    saveNotes(notesToKeep);
    log(chalk.inverse.bold.green("Note removed!"));
  } else {
    log(chalk.inverse.bold.red("No note found!"));
  }
};

//list notes
const listNotes = () => {
  log(chalk.inverse.bold.yellow(`Your Notes...`));
  const notes = loadNotes();
  notes.forEach((note) => log(note.title));
};
//read notes
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (!note) {
    log(chalk.inverse.bold.red("No note found!"));
  } else {
    log(chalk.inverse.bold.blue(note.title));
    log(`${note.body}`);
  }
};
module.exports = {
  listNotes: listNotes,
  addNotes: addNotes,
  removeNotes: removeNotes,
  readNote: readNote,
};
