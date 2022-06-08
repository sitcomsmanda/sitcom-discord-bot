const { Join } = require("../modules/drawMultilineText.js");
// Memasukan Canvas

// Distribusi module events dengan nama event "guildMemberAdd"
// Yaitu ketika ada member masuk server
module.exports = {
  // Nama Event: guildMemberAdd
  name: "guildMemberAdd",
  once: false,
  // Method isi Event guildMemberAdd
  async execute(guildMember) {
    const client = guildMember.client;
    Join(guildMember, client);
  },
};
