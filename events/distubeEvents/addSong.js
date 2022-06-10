const { MessageEmbed } = require("discord.js");

module.exports = {
  // Nama Event: guildMemberRemove
  name: "addSong",
  // Method isi Event guildMemberRemove
  async execute(queue, song) {
    await queue.textChannel.send({
      embeds: [
        new MessageEmbed()
          .setColor("#43E97B")
          .setDescription(
            `🟢 | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
          ),
      ],
    });
  },
};
