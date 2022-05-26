const { MessageEmbed } = require("discord.js");

// Distribusi module dollar command dengan nama "ping"
module.exports = {
  data: {
    name: "ping",
  },
  async execute(message) {
    const embed = new MessageEmbed()
      .setTitle("Calculating ping...")
      .setColor("#ffda00");

    await message.channel.send({ embeds: [embed] }).then((msg) => {
      const ping = msg.createdTimestamp - message.createdTimestamp;
      const embed2 = new MessageEmbed()
        .setTitle(
          `${message.author.username} latency: ${ping} ms\n${message.client.user.username} latency: ${message.client.ws.ping} ms`
        )
        .setColor("#07C966");
      msg.edit({ embeds: [embed2] });
      return;
    });
  },
};
