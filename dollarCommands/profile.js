// const { MessageEmbed } = require("discord.js");
// const Builders = require("@discordjs/builders");

module.exports = {
  data: {
    name: "profile",
    desc: "mengenai bot ini",
  },
  async execute(message) {
    let text = ``;
    text += `👀 `;
    text += `Bot ini dikembangkan oleh anak-anak SITCOM SMA Negeri 2 Bandung `;
    text += `dengan alasan kemandirian agar tidak bergantung kepada bot lain.`;
    text += `\n`;

    await message.channel.send({ content: text });
    return;
  },
};
