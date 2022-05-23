// Distribusi module events dengan nama event "guildMemberAdd"
// Yaitu ketika ada member masuk server
module.exports = {
  // Nama Event: guildMemberAdd
  name: "guildMemberAdd",
  // Method isi Event guildMemberAdd
  async execute(member) {
    console.log(member.guild.channels);
    member.guild.channels.cache
      .get("912507318929858600")
      .send(`Selamat datang ${member.user}!`);
  },
};
// member.name untuk ngambil nama server
