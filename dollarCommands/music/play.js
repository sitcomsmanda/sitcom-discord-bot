const { MessageEmbed } = require("discord.js");

module.exports = {
  data: {
    name: "play",
    desc: "memainkan musik dari youtube",
  },
  async execute(message) {
    const { client, guild, member, channel, content } = message;
    const voiceChannel = member.voice.channel;
    const query = content.split(" ")[1];

    if (!query) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("YELLOW")
            .setDescription(
              `Tolong masukan format pencarian yang benar!\n\`$play nama-musik\``
            ),
        ],
      });
    }

    if (!voiceChannel) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("YELLOW")
            .setDescription(
              `Kamu harus berada dalam \`voice channel\` untuk memainkan musik!`
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
            .setColor("GREEN")
            .setDescription(
              `Aku sedang memutar musik di <#${guild.me.voice.channelId}>.`
            ),
        ],
      });
    }

    await client.distube.play(voiceChannel, query, {
      textChannel: channel,
      member: member,
    });

    return message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("GREEN")
          .setDescription(`🎵 Permintaan musik diterima.`),
      ],
    });
  },
};
