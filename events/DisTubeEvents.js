const { MessageEmbed } = require("discord.js");
const client = require("../index.js");

try {
  client.distube

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
