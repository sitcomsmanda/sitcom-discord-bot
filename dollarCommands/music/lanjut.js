const { MessageEmbed } = require("discord.js");

module.exports = {
  data: {
    name: "lanjut",
    desc: "memutar kembali musik yang sedang dijeda",
  },
  async execute(message) {
    const { client, guild, member } = message;
    const voiceChannel = member.voice.channel;

    if (!voiceChannel) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setDescription(
              `❗ | Kamu harus berada dalam \`voice channel\` untuk memutar kembali musik`
            ),
        ],
      });
    }

    if (
      guild.me.voice.channelId &&
      voiceChannel.id !== guild.me.voice.channelId
    ) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("YELLOW")
            .setDescription(
              `❗ | Aku sedang memutar musik di <#${guild.me.voice.channelId}>.`
            ),
        ],
      });
    }

    const queue = await client.distube.getQueue(voiceChannel);

    if (!queue) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setDescription(`🚫 | Tidak ada musik yang sedang diputar`),
        ],
      });
    }

    const song = queue.songs.at(0);

    await queue.resume(voiceChannel);

    return message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("#07C966")
          .setDescription(`▶️ | \`${song.name}\``),
      ],
    });
  },
};
