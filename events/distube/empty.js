const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "empty",
  async execute(channel) {
    channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("LIGHT_GREY")
          .setDescription("🏃 | Keluar dari channel karena sepi..."),
      ],
    });
  },
};
