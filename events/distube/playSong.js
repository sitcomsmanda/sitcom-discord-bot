const status = require("../../modules/distubeStatus.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "playSong",
  async execute(queue, song) {
    await queue.textChannel.send({
      embeds: [
        new MessageEmbed()
          .setColor("#43E97B")
          .setDescription(
            `▶️ | Memutar \`${song.name}\` - \`${song.formattedDuration}\`\n\nDiputar oleh: ${song.user}`
          ),
      ],
    });
    await queue.textChannel.send({
      embeds: [
        new MessageEmbed().setColor("LIGHT_GREY").setDescription(status(queue)),
      ],
    });
  },
};
