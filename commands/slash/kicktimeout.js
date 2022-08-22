// Memasukan Builders Commands Discord Package
const { SlashCommandBuilder, time } = require("@discordjs/builders");

async function kickTimeout(interaction) {
  const delay = interaction.options.getInteger("delay");
  const msDelay = delay * 1000;
  const membersCache = interaction.guild.members.cache;
  const ch = interaction.channel;
  const dateToKick = new Date(Date.now() + msDelay);
  const timeString = time(dateToKick, "R");

  const warnMsg = `⚠️ Warning: Segera Berkenalan di <#902096654444920872>!\n\nJika tidak, maka kamu akan di kick dari ${interaction.guild.name} dalam ${timeString}`;

  const members = [];

  for (let i = 0; i < membersCache.size; i++) {
    const member = membersCache.at(i);
    if (member.roles.cache.size <= 1) {
      members.push(member);
    }
  }

  members.forEach((member) => {
    member.send(warnMsg);
  });

  setTimeout(() => {
    const kickedMembers = [];
    let msg = `Berikut daftarnya:`;

    members.forEach((member) => {
      if (member.roles.cache.size <= 1) {
        member.send(`Selamat tinggal!`);
        kickedMembers.push(member);
        member.kick(`Kamu ini siapa?`);
      } else {
        member.send(`Sip, kamu sudah berkenalan!`);
      }
    });

    for (let i = 0; i < kickedMembers.length; i++) {
      msg += `\n- <@${kickedMembers[i].id}>`;
    }

    ch.send(`Users yang belum berkenalan telah di kick!`);
    ch.send(msg);
  }, msDelay);

  await interaction.reply({
    content: `Oke!\nSemua Users yang belum berkenalan akan di kick\n${timeString}`,
  });
}

// Distribusi module command dengan nama "kicktimeout"
module.exports = {
  data: new SlashCommandBuilder()
    .setName("kicktimeout")
    .setDescription("Warn non-member users and kick them!")
    .addIntegerOption((option) =>
      option
        .setName("delay")
        .setDescription("time in second?")
        .setRequired(true)
        .addChoices(
          { name: "5 seconds", value: 5 },
          { name: "half-minute", value: 30 },
          { name: "a minute", value: 60 },
          { name: "half-hour", value: 1800 },
          { name: "an hour", value: 3600 },
          { name: "half-day", value: 43200 },
          { name: "a day", value: 86400 }
        )
    ),
  async execute(interaction) {
    kickTimeout(interaction);
  },
};
