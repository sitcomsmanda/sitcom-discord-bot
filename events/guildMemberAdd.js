const { MessageEmbed } = require("discord.js");

// Distribusi module events dengan nama event "guildMemberAdd"
// Yaitu ketika ada member masuk server
module.exports = {
  // Nama Event: guildMemberAdd
  name: "guildMemberAdd",
  // Method isi Event guildMemberAdd
  async execute(member) {
    console.log(member.user);

    const welcomeEmbed = new MessageEmbed()
      .setColor("#07C966")
      .setTitle(`Halo ${member.user.username}!`)
      .setDescription(
        `Selamat datang di server discord\n**SITCOM** (Student IT Community)\n\nDiharapkan untuk membaca **Peraturan** di <#978124379013644298> terlebih dahulu!\n\nDilanjutkan ke <#978124379013644298> untuk berkenalan sesuai format.\n\nJika ada pertanyaan, jangan malu untuk bertanya kepada __Ketua__`
      )
      .setImage(member.user.displayAvatarURL())
      .setTimestamp()
      .setFooter({
        text: `${member.user.username}`,
        iconURL: `${member.user.displayAvatarURL()}`,
      });

    member.guild.channels.cache.get("912507318929858600").send({
      content: `Selamat datang ${member.user}!`,
      embeds: [welcomeEmbed],
    });
  },
};
// member.name untuk ngambil nama server
