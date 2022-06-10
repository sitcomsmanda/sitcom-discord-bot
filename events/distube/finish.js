const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "finish",
  async execute(queue) {
    await queue.textChannel.send({
      embeds: [
        new MessageEmbed()
          .setColor("#43E97B")
          .setDescription("✅ | Antrean kosong, selesai memutar musik!"),
      ],
    });
  },
};
