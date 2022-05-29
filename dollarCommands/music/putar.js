const { MessageEmbed } = require("discord.js");

module.exports = {
  data: {
    name: "putar",
    desc: "memainkan musik dari situs lain",
  },
  async execute(message) {
    const { client, guild, member, channel, content } = message;
    const voiceChannel = member.voice.channel;
    const query = content.substring(6);

    if (!query) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setDescription(
              `Tolong masukan format pencarian yang benar!\n\`$putar (judul/url musik)\``
            ),
        ],
      });
    }

    if (!voiceChannel) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
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
            .setColor("#07C966")
            .setDescription(
              `Aku sedang memutar musik di <#${guild.me.voice.channelId}>.`
            ),
        ],
      });
    }

    message.channel.send({
      content: `🔎 Mencari musik...`,
    });

    return client.distube
      .play(voiceChannel, query, {
        textChannel: channel,
        member: member,
      })
      .then(() => {
        const songCount = client.distube.getQueue(voiceChannel).songs.length;
        const song = client.distube
          .getQueue(voiceChannel)
          .songs.at(songCount - 1);
        message.channel.lastMessage.edit({
          content: `🎵 Memutar: \`${song.name}\``,
        });
      });
  },
};
