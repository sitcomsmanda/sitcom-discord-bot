const { MessageEmbed } = require("discord.js");
const client = require("../index.js");

const status = (queue) =>
  `Volume: \`${queue.volume}%\` | Filter: \`${
    queue.filters.join(", ") || "Off"
  }\` | Loop: \`${
    queue.repeatMode
      ? queue.repeatMode === 2
        ? "All Queue"
        : "This Song"
      : "Off"
  }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

try {
  client.distube
    .on("playSong", (queue, song) =>
      queue.textChannel.send({
        embeds: [
          new MessageEmbed()
            .setColor("#07C966")
            .setDescription(
              `🎶 | Playing \`${song.name}\` - \`${
                song.formattedDuration
              }\`\nRequested by: ${song.user}\n${status(queue)}`
            ),
        ],
      })
    )
    .on("addSong", (queue, song) =>
      queue.textChannel.send({
        embeds: [
          new MessageEmbed()
            .setColor("GREEN")
            .setDescription(
              `🟢 | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
            ),
        ],
      })
    )
    .on("addList", (queue, playlist) =>
      queue.textChannel.send({
        embeds: [
          new MessageEmbed()
            .setColor("GREEN")
            .setDescription(
              `🟢 | Added \`${playlist.name}\` playlist (${
                playlist.songs.length
              } songs) to queue\n${status(queue)}`
            ),
        ],
      })
    )
    .on("error", (channel, e) => {
      channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setDescription(
              `🚫 | An error encountered: ${e.toString().slice(0, 1974)}`
            ),
        ],
      });
      console.error(e);
    })
    .on("empty", (channel) =>
      channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("LIGHT_GREY")
            .setDescription("Voice channel is empty! Leaving the channel..."),
        ],
      })
    )
    .on("searchNoResult", (message, query) =>
      message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("YELLOW")
            .setDescription(`🟡 | No result found for \`${query}\`!`),
        ],
      })
    )
    .on("finish", (queue) =>
      queue.textChannel.send({
        embeds: [
          new MessageEmbed().setColor("GREEN").setDescription("Finished!"),
        ],
      })
    );
} catch (error) {
  console.error;
}
