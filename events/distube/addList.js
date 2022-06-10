const status = require("../../modules/distubeStatus.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "addList",
  async execute(queue, playlist) {
    await queue.textChannel.send({
      embeds: [
        new MessageEmbed()
          .setColor("#43E97B")
          .setDescription(
            `🟢 | Added \`${playlist.name}\` playlist (${
              playlist.songs.length
            } songs) to queue\n${status(queue)}`
          ),
      ],
    });
  },
};
