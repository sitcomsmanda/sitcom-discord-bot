const { MessageEmbed } = require("discord.js");

// Distribusi module events dengan nama event "messageCreate"
module.exports = {
  // Nama Event: messageCreate
  name: "messageCreate",
  // Method isi Events messageCreate
  async execute(message) {
    const prefix = `$`;
    if (!message.content[0] === prefix) return;

    const welcomeEmbed = new MessageEmbed()
      .setColor("#07C966")
      .setTitle(`Halo ${message.author.username}!`)
      .setDescription(
        `Selamat datang di server discord\n**SITCOM** (Student IT Community)\n\nDiharapkan untuk membaca **Peraturan** di <#978124379013644298> terlebih dahulu!\n\nDilanjutkan ke <#978124379013644298> untuk berkenalan sesuai format.\n\nJika ada pertanyaan, jangan malu untuk bertanya kepada __Ketua__`
      )
      .setImage(message.author.avatarURL({ size: 256 }))
      .setTimestamp()
      .setFooter({
        text: `${message.author.username}`,
        iconURL: `${message.author.avatarURL({ size: 64 })}`,
      });

    if (message.content.substring(0) === `${prefix}ping`) {
      console.log(message.client.user);
      const reply = `Selamat datang <@${message.author.id}>!`;
      await message.reply({ content: reply, embeds: [welcomeEmbed] });
    }
  },
};
