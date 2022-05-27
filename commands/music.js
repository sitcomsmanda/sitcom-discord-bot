// Memasukan Builders Commands Discord Package
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("music")
    .setDescription("Play a song!"),
  async execute(interaction) {
    await interaction.reply("Pong!");
    await interaction.followUp("with slash(/) ping.");
  },
};
