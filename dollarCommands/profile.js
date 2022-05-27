require("dotenv").config();

const { MessageEmbed } = require("discord.js");
const { time } = require("@discordjs/builders");

const GUILD_ID = process.env.GUILD_ID;

module.exports = {
  data: {
    name: "profile",
    desc: "mengenai bot ini",
  },
  async execute(message) {
    const guild = await message.author.client.guilds.cache.get(GUILD_ID);
    const user = await message.author;
    const members = await guild.members.search({ query: user.username });
    const member = await members.get(user.id);

    const embed = new MessageEmbed()
      .setColor(`${member.displayHexColor}`)
      .setFields(
        {
          name: `ID`,
          value: `${member.user.id}`,
        },
        {
          name: `Username`,
          value: `${member.user.username}`,
        },
        {
          name: `Nickname`,
          value: `${member.displayName}`,
        },
        {
          name: `Account Created`,
          value: `${time(member.user.createdAt, "F")}`,
        },
        {
          name: `Join ${member.guild.name} At`,
          value: `${time(member.joinedAt, "F")}`,
        }
      )
      .setThumbnail(`${member.user.avatarURL({ format: "png", size: 64 })}`);

    await message.channel.send({ embeds: [embed] });
    return;
  },
};
