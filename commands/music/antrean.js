const { MessageEmbed } = require("discord.js");

const setStatus = (queue) =>
  `Volume: \`${queue.volume}%\` | Filter: \`${
    queue.filters.join(", ") || "Off"
  }\` | Loop: \`${
    queue.repeatMode
      ? queue.repeatMode === 2
        ? "All Queue"
        : "This Song"
      : "Off"
  }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

module.exports = {
  data: {
    name: "antrean",
    desc: "melihat antrean",
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
            .setDescription(`🚫 | Antrean musik lagi kosong nih`),
        ],
      });
    }

    const listSongs = `${queue.songs.map(
      (song, id) =>
        `\n**${++id}**. ${song.name} - \`${song.formattedDuration}\``
    )}`;

    const status = setStatus(queue);

    message.channel.send({
      embeds: [
        new MessageEmbed().setColor("LIGHT_GREY").setDescription(`${status}`),
      ],
    });

    return message.channel.send({
      embeds: [
        new MessageEmbed().setColor("#43E97B").setDescription(`${listSongs}`),
      ],
    });
  },
};
