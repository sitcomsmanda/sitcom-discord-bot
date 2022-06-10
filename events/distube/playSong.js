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
            `🎶 | Playing \`${song.name}\` - \`${
              song.formattedDuration
            }\`\nRequested by: ${song.user}\n${status(queue)}`
          ),
      ],
    });
  },
};
