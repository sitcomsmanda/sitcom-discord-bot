const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "addSong",
  async execute(queue, song) {
    await queue.textChannel.send({
      embeds: [
        new MessageEmbed()
          .setColor("#43E97B")
          .setDescription(
            `↩️ | Memasukan ${song.name} - \`${song.formattedDuration}\` ke antrean oleh ${song.user}`
          ),
      ],
    });
  },
};
