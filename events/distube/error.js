const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "error",
  async execute(channel, e) {
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
  },
};
