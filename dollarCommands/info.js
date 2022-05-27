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

    // Miliseconds to Seconds
    const uptime = Math.floor(client.uptime / 1000);

    // Format to HH,MM,SS
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime - hours * 3600) / 60);
    const seconds = uptime - hours * 3600 - minutes * 60;

    const memory = process.memoryUsage().rss;
    const megabyte = memory / 1000000;
    const displayMemory = megabyte.toString().substring(0, 5);

    const embed = new MessageEmbed().setColor(`#07C966`).setFields(
      {
        name: `⏳ Uptime`,
        value: `~ ${hours ? `${hours}h,` : ``} ${
          minutes ? `${minutes}m,` : ``
        } ${seconds ? `${seconds}s` : ``}`,
      },
      {
        name: `🗄️ Memory`,
        value: `~ ${displayMemory}mb`,
      },
      {
        name: `🟠 API Latency`,
        value: `~ ${client.ws.ping}ms`,
      },
      {
        name: `🏘️ Servers`,
        value: `~ ${client.guilds.cache.size}`,
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
