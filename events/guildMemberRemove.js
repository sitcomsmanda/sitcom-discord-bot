// Distribusi module events dengan nama event "guildMemberRemove"
// Yaitu ketika ada member keluar server
module.exports = {
  // Nama Event: guildMemberRemove
  name: "guildMemberRemove",
  // Method isi Event guildMemberRemove
  async execute(member) {
    console.log(member.guild.channels);
    member.guild.channels.cache
      .get("912507318929858600")
      .send(`Selamat tinggal ${member.user}!`);
  },
};
// member.name untuk ngambil nama server