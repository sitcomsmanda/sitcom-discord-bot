const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "error",
  async execute(channel, e) {
    channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("RED")
          .setDescription(
            `🚫 | Ada kesalahan sistem: ${e.toString().slice(0, 1974)}`
          ),
      ],
    });
    console.error(e);
  },
};
