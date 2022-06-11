// Distribusi module events dengan nama event "guildMemberRemove"
// Yaitu ketika ada member keluar server
module.exports = {
  // Nama Event: guildMemberRemove
  name: "guildMemberRemove",
  // Method isi Event guildMemberRemove
  async execute(member) {
    const lobbyCh = "902004102974828606";
    member.guild.channels.cache
      .get(lobbyCh)
      .send(`Selamat tinggal ${member.user}!`);
  },
};
// member.name untuk ngambil nama server
