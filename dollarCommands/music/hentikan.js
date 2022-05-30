const { MessageEmbed } = require("discord.js");

module.exports = {
  data: {
    name: "hentikan",
    desc: "menghentikan semua musik yang diputar",
  },
  async execute(message) {
    const { client, guild } = message;
    const voiceChannel = guild.me.voice;
    const queue = await client.distube.getQueue(voiceChannel);

    if (!queue || !voiceChannel.channelId) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setDescription(`🚫 | Tidak ada musik yang sedang diputar`),
        ],
      });
    }

    await queue.stop(voiceChannel);

    return message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("#07C966")
          .setDescription(`⏹️ | Menghentikan musik`),
      ],
    });
  },
};
