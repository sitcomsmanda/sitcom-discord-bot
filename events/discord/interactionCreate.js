// Distribusi module events dengan nama event "interactionCreate"
module.exports = {
  // Nama Event: interactionCreate
  name: "interactionCreate",
  // kondisi once
  once: false,
  // Method isi Events ready
  async execute(interaction) {
    if (!interaction.isCommand()) return;

    const command = interaction.client.slashCommands.get(
      interaction.commandName
    );

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
