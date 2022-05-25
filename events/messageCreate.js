const dollarsCommands = require("../modules/dollars_commands.js");

// Distribusi module events dengan nama event "messageCreate"
module.exports = {
  // Nama Event: messageCreate
  name: "messageCreate",
  // Method isi Events messageCreate
  async execute(message) {
    // Panggil modules untuk dollars commands "$"
    dollarsCommands(message);
  },
};
