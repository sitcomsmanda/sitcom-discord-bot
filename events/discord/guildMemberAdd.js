const { Join } = require("../../modules/perkenalan.js");

// Distribusi module events dengan nama event "guildMemberAdd"
// Yaitu ketika ada member masuk server
module.exports = {
  // Nama Event: guildMemberAdd
  name: "guildMemberAdd",
  // Method isi Event guildMemberAdd
  async execute(guildMember) {
    const client = guildMember.client;
    Join(guildMember, client);
  },
};
