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
    desc: "melihat antrean musik yang diputar",
  },
  async execute(message) {
    const { client, member } = message;
    const voiceChannel = member.voice.channel;
    const queue = await client.distube.getQueue(voiceChannel);

    if (!queue) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("#07C966")
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
        new MessageEmbed().setColor("#07C966").setDescription(`${status}`),
      ],
    });

    return message.channel.send({
      embeds: [
        new MessageEmbed().setColor("GREY").setDescription(`${listSongs}`),
      ],
    });
  },
};
