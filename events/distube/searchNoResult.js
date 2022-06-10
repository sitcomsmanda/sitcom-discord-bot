const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "searchNoResult",
  async execute(message, query) {
    await message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("YELLOW")
          .setDescription(`🟡 | No result found for \`${query}\`!`),
      ],
    });
  },
};
