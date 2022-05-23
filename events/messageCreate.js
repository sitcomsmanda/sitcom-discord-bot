const { MessageEmbed } = require("discord.js");

// Distribusi module events dengan nama event "messageCreate"
module.exports = {
  // Nama Event: messageCreate
  name: "messageCreate",
  // Method isi Events messageCreate
  async execute(message) {
    const prefix = `$`;
    if (!message.content[0] === prefix) return;

    if (message.content.substring(0) === `${prefix}ping`) {
      const embed = new MessageEmbed()
        .setTitle("Calculating ping...")
        .setColor("#ffda00");

      message.channel.send({ embeds: [embed] }).then((msg) => {
        const ping = msg.createdTimestamp - message.createdTimestamp;
        console.log(message.client);
        const embed2 = new MessageEmbed()
          .setTitle(
            `${message.author.username} latency: ${ping}ms\n${message.client.user.username} latency: ${message.client.ws.ping}ms`
          )
          .setColor("#07C966");
        msg.edit({ embeds: [embed2] });
      });
    }
  },
};
