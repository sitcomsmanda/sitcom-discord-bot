const dollarCommands = require("../modules/dollarCommands.js");

// Distribusi module events dengan nama event "messageCreate"
module.exports = {
  // Nama Event: messageCreate
  name: "messageCreate",
  // Method isi Events messageCreate
  async execute(message) {
    // Panggil modules untuk dollar commands "$"
    await dollarCommands(message);
  },
};
