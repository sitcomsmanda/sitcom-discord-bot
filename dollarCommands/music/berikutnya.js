const { MessageEmbed } = require("discord.js");

module.exports = {
  data: {
    name: "berikutnya",
    desc: "melewati ke antrean musik berikutnya",
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
              `❗ | Kamu harus berada dalam \`voice channel\` untuk melewati antrean musik`
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

    const prevSong = queue.songs.at(0);
    const nextSong = queue.songs.at(1);

    await queue.skip(voiceChannel);

    return message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("#07C966")
          .setDescription(`⏭️ | \`1. ${prevSong}\` > \`2. ${nextSong}\``),
      ],
    });
  },
};
