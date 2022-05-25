require("dotenv").config();
const { MessageEmbed } = require("discord.js");

// const CLIENT_ID = process.env.CLIENT_ID;
// const GUILD_ID = process.env.GUILD_ID;
const PREFIX = process.env.PREFIX;

const dollarCommands = (message) => {
  if (!message.content[0] === PREFIX) return;

  if (message.content.substring(0) === `${PREFIX}help`) {
    const embed = new MessageEmbed()
      .setTitle("Belum jadi cuy...")
      .setColor("#07C966");
    message.channel.send({ embeds: [embed] });
  }

  if (message.content.substring(0) === `${PREFIX}ping`) {
    const embed = new MessageEmbed()
      .setTitle("Calculating ping...")
      .setColor("#ffda00");

    message.channel.send({ embeds: [embed] }).then((msg) => {
      const ping = msg.createdTimestamp - message.createdTimestamp;
      const embed2 = new MessageEmbed()
        .setTitle(
          `${message.author.username} latency: ${ping} ms\n${message.client.user.username} latency: ${message.client.ws.ping} ms`
        )
        .setColor("#07C966");
      msg.edit({ embeds: [embed2] });
    });
  }
};

module.exports = dollarCommands;
