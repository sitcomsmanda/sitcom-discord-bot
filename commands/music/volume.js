const { MessageEmbed } = require("discord.js");

module.exports = {
  data: {
    name: "volume",
    desc: "mengatur volume",
  },
  async execute(message) {
    const { client, guild, member, content } = message;
    const voiceChannel = member.voice.channel;
    const param = content.split(" ")[1];
    const regex = /^\d+/;
    let volume = 0;

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
            .setColor("YELLOW")
            .setDescription(
              `❗ | Aku sedang memutar musik di <#${guild.me.voice.channelId}>.`
            ),
        ],
      });
    }

    if (!regex.test(param) || !param) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setDescription(
              `Tolong masukan format volume yang benar!\n\`$volume (angka: 10 - 100)\``
            ),
        ],
      });
    } else {
      volume = parseInt(param);
    }

    if (volume > 100 || volume < 1) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setDescription(
              `🚫 | Kamu hanya diperbolehkan memasukan angka diantara 1 sampai 100!`
            ),
        ],
      });
    }

    await client.distube.setVolume(voiceChannel, volume);

    return message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("#43E97B")
          .setDescription(`📶 | Volume telah diubah menjadi \`${volume}%\``),
      ],
    });
  },
};
