const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "empty",
  async execute(channel) {
    channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("LIGHT_GREY")
          .setDescription("Voice channel is empty! Leaving the channel..."),
      ],
    });
  },
};
