const handleDollarCommands = require("../modules/handleDollarCommands.js");
const handleMusicCommands = require("../modules/handleMusicCommands.js");

// Distribusi module events dengan nama event "messageCreate"
module.exports = {
  // Nama Event: messageCreate
  name: "messageCreate",
  // Method isi Events messageCreate
  async execute(message) {
    const { content, client } = message;
    if (content[0] === client.prefix) {
      // Menampilkan User yang menggunakan command
      console.log(`${message.author.username}: ${message.content}`);
      // Panggil modules untuk dollar commands "$"
      await handleDollarCommands(message);
      await handleMusicCommands(message);
    }
  },
};
