// Memasukan Builders Commands Discord Package
const { SlashCommandBuilder } = require("@discordjs/builders");

// Distribusi module command dengan nama "ping"
module.exports = {
  // Data Command "ping"
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  // Method isi Command "ping"
  async execute(interaction) {
    await interaction.reply("Pong!");
    await interaction.followUp("with slash(/) ping.");
  },
};
