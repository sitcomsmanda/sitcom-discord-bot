// Memasukan Builders Commands Discord Package
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("music")
    .setDescription("Music system")
    // music play
    .addSubcommand((subcommand) => {
      subcommand
        .setName("play")
        .setDescription("Play a song")
        .addStringOption((option) => {
          option
            .setName("query")
            .setDescription("Provide a name or a url for the song")
            .setRequired(true);
        });
    })
    // music volume
    .addSubcommand((subcommand) => {
      subcommand
        .setName("volume")
        .setDescription("Alter the volume")
        .addNumberOption((option) => {
          option
            .setName("percent")
            .setDescription("10 - 100%")
            .setRequired(true);
        });
    })
    // music setting
    .addSubcommand((subcommand) => {
      subcommand
        .setName("setting")
        .setDescription("Select an option")
        .addStringOption((option) => {
          option
            .setName("options")
            .setDescription("Select an option")
            .setRequired(true)
            .addChoices(
              { name: "queue", value: "queue" },
              { name: "skip", value: "skip" },
              { name: "pause", value: "pause" },
              { name: "resume", value: "resume" },
              { name: "stop", value: "stop" }
            );
        });
    }),
  async execute(interaction) {},
};
