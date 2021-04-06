const yargs = require("yargs");
const notes = require("./notes");
const log = console.log;

//Version of the application
yargs.version("1.0.0");

// add a note
yargs.command({
  command: "add",
  alias: "a",
  describe: "Adds a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Body of the note",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNotes(argv.title, argv.body);
  },
});

//remove a note
yargs.command({
  command: "remove",
  describe: "Removes a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNotes(argv.title);
  },
});

//read a note
yargs.command({
  command: "read",
  describe: "Reads a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});
// list all the notes
yargs.command({
  command: "list",
  describe: "Lists all the notes",
  handler() {
    notes.listNotes();
  },
});

yargs.parse();
