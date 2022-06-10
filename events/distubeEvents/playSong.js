const status = require("../../modules/distubeStatus.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  // Nama Event: guildMemberRemove
  name: "playSong",
  // Method isi Event guildMemberRemove
  async execute(queue, song) {
    await queue.textChannel.send({
      embeds: [
        new MessageEmbed()
          .setColor("#07C966")
          .setDescription(
            `🎶 | Playing \`${song.name}\` - \`${
              song.formattedDuration
            }\`\nRequested by: ${song.user}\n${status(queue)}`
          ),
      ],
    });
  },
};
