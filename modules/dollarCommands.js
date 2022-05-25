require("dotenv").config();
const { MessageEmbed } = require("discord.js");
const Builders = require("@discordjs/builders");

// const CLIENT_ID = process.env.CLIENT_ID;
// const GUILD_ID = process.env.GUILD_ID;
const PREFIX = process.env.PREFIX;

const dollarCommands = async (message) => {
  if (message.content[0] !== PREFIX) return;

  if (message.content.substring(0) === `${PREFIX}help`) {
    const title = `Rentetan Perintah Dolar ${Builders.quote("$")}`;
    const $ping = `${Builders.inlineCode("$ping")} untuk melihat latensi.`;
    const $materi = `${Builders.inlineCode(
      "$materi"
    )} untuk melihat rentetan materi di gdrive.`;
    const embed = new MessageEmbed()
      .setTitle(title)
      .setDescription(`${$ping}\n${$materi}\n\nBaru sedikit cuy, 😥`)
      .setColor("#07C966");
    message.channel.send({ embeds: [embed] });
    return;
  }

  if (message.content.substring(0) === `${PREFIX}materi`) {
    message.channel.send(
      `📁 https://drive.google.com/drive/folders/1tuo6zoewZ0f1t4KDuFiHviVRTQplnd3n?usp=sharing`
    );
    return;
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
      return;
    });
  }

  if (message.content !== `❓ Coba ketik ${Builders.inlineCode(`$help`)}.`) {
    message.channel.send(`❓ Coba ketik ${Builders.inlineCode(`$help`)}.`);
    return;
  }
};

module.exports = dollarCommands;
