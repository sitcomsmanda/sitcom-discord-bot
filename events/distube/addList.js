const status = require("../../modules/distubeStatus.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "addList",
  async execute(queue, playlist) {
    await queue.textChannel.send({
      embeds: [
        new MessageEmbed().setColor("#43E97B").setDescription(
          `↩️ | Memasukan daftar putar
             \`${playlist.name}\` (${
            playlist.songs.length
          } songs) ke antrean\n${status(queue)}`
        ),
      ],
    });
  },
};
