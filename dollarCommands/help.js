const { MessageEmbed } = require("discord.js");
const Builders = require("@discordjs/builders");

module.exports = {
  data: {
    name: "help",
    desc: "rentetan perintah dolar",
  },
  async execute(message) {
    const dollarCommands = message.client.dollarCommands;
    const title = `Rentetan Perintah ${Builders.inlineCode("$")}Dolar`;
    let description = ``;
    let spaceCount = 1;
    let spaceIndent = ``;

    // Algoritma untuk menghitung spasi agar sesuai indentasinya
    for (const dollarCommand of dollarCommands) {
      const name = dollarCommand[1].data.name;

      if (spaceCount < name.length) {
        spaceCount = name.length;
      }
    }

    for (const dollarCommand of dollarCommands) {
      const name = dollarCommand[1].data.name;
      const desc = dollarCommand[1].data.desc;

      for (let i = 0; i < spaceCount - name.length; i++) {
        spaceIndent += ` `;
      }

      description += Builders.inlineCode(` ${name}${spaceIndent} `);
      description += ` ${desc}`;
      description += `\n`;
      spaceIndent = ``;
    }

    const embed = new MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .setColor("#07C966");
    await message.channel.send({ embeds: [embed] });
    return;
  },
};
