const { MessageEmbed } = require("discord.js");
const Builders = require("@discordjs/builders");

const makeIndent = (commands) => {
  let description = ``;
  let spaceCount = 1;
  let spaceIndent = ``;

  // Algoritma untuk menghitung spasi agar sesuai indentasinya
  for (const command of commands) {
    const name = command[1].data.name;

    if (spaceCount < name.length) {
      spaceCount = name.length;
    }
  }

  for (const command of commands) {
    const name = command[1].data.name;
    const desc = command[1].data.desc;

    for (let i = 0; i < spaceCount - name.length; i++) {
      spaceIndent += ` `;
    }

    description += Builders.inlineCode(` ${name}${spaceIndent} `);
    description += ` ${desc}`;
    description += `\n`;
    spaceIndent = ``;
  }

  return description;
};

module.exports = {
  data: {
    name: "help",
    desc: "rentetan perintah",
  },
  async execute(message) {
    const messageCommands = message.client.messageCommands;
    const musicCommands = message.client.musicCommands;
    let description = "";

    description += `\n**Perintah Biasa**\n`;
    description += makeIndent(messageCommands);
    description += `\n**Perintah Musik**\n`;
    description += makeIndent(musicCommands);

    const embed = new MessageEmbed()
      .setDescription(description)
      .setColor("#07C966");
    await message.channel.send({ embeds: [embed] });
    return;
  },
};
