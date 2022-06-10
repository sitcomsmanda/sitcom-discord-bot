const { MessageEmbed } = require("discord.js");

module.exports = {
  data: {
    name: "berhenti",
    desc: "menghentikan musik",
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
              `❗ | Kamu harus berada dalam \`voice channel\` untuk menghentikan musik`
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

    await queue.stop(voiceChannel);

    return message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("#43E97B")
          .setDescription(`⏹️ | Musik dihentikan`),
      ],
    });
  },
};
