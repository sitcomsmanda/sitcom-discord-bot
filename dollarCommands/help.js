const { MessageEmbed } = require("discord.js");
const Builders = require("@discordjs/builders");

module.exports = {
  data: {
    name: "materi",
  },
  async execute(message) {
    const title = `Rentetan Perintah Dolar ${Builders.quote("$")}`;
    const $ping = `${Builders.inlineCode("$ping")} untuk melihat latensi.`;
    const $materi = `${Builders.inlineCode(
      "$materi"
    )} untuk melihat rentetan materi di gdrive.`;
    const embed = new MessageEmbed()
      .setTitle(title)
      .setDescription(`${$ping}\n${$materi}\n\nBaru sedikit cuy, 😥`)
      .setColor("#07C966");
    await message.channel.send({ embeds: [embed] });
    return;
  },
};
