const { MessageEmbed } = require("discord.js");
// const { time } = require("@discordjs/builders");
const packages = require("../package.json");

module.exports = {
  data: {
    name: "info",
    desc: "riwayat akun bot",
  },
  async execute(message) {
    const client = await message.client;
    // const user = await message.author;

    const seconds = Math.round(client.uptime / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);

    const embed = new MessageEmbed().setColor(`#07C966`).setFields(
      {
        name: `⏳ Uptime`,
        value: `~ ${hours ? `${hours}h,` : ``} ${
          minutes ? `${minutes}m,` : ``
        } ${seconds ? `${seconds}s` : ``}`,
      },
      {
        name: `📘 Discord.js`,
        value: `~ v${packages.dependencies["discord.js"].substring(1)}`,
      },
      {
        name: `📗 NodeJS`,
        value: `~ v${process.versions.node}`,
      }
    );

    await message.channel.send({ embeds: [embed] });
    return;
  },
};
