const { MessageEmbed } = require("discord.js");

// Distribusi module dollar command dengan nama "ping"
module.exports = {
  data: {
    name: "ping",
    desc: "melihat latensi.",
  },
  async execute(message) {
    const embed = new MessageEmbed()
      .setTitle("Calculating ping...")
      .setColor("#ffda00");

    await message.channel.send({ embeds: [embed] }).then((msg) => {
      const ping = msg.createdTimestamp - message.createdTimestamp;
      if (ping < 100) {
        const embed2 = new MessageEmbed()
          .setTitle(`${ping} ms`)
          .setColor("GREEN");
        msg.edit({ embeds: [embed2] });
      } else {
        const embed2 = new MessageEmbed()
          .setTitle(`${ping} ms`)
          .setColor("RED");
        msg.edit({ embeds: [embed2] });
      }
      return;
    });
  },
};
