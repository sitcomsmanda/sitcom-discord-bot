const { MessageEmbed } = require("discord.js");
const client = require("../index.js");

try {
  client.distube.on("finish", (queue) =>
    queue.textChannel.send({
      embeds: [
        new MessageEmbed().setColor("GREEN").setDescription("Finished!"),
      ],
    })
  );
} catch (error) {
  console.error;
}
