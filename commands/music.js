// Memasukan Builders Commands Discord Package
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("music")
    .setDescription("Music system")
    // music play
    .addSubcommand((subcommand) =>
      subcommand
        .setName("play")
        .setDescription("Play a song")
        .addStringOption((option) =>
          option
            .setName("query")
            .setDescription("Provide a name or a url for the song")
            .setRequired(true)
        )
    )
    // music volume
    .addSubcommand((subcommand) =>
      subcommand
        .setName("volume")
        .setDescription("Alter the volume")
        .addNumberOption((option) =>
          option
            .setName("percent")
            .setDescription("10 - 100%")
            .setRequired(true)
        )
    )
    // music setting
    .addSubcommand((subcommand) =>
      subcommand
        .setName("setting")
        .setDescription("Select an option")
        .addStringOption((option) =>
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
            )
        )
    ),
  async execute(interaction) {
    const { client, guild, member, channel, options } = interaction;
    const VoiceChannel = member.voice.channel;

    if (!VoiceChannel) {
      return interaction.reply({
        content: `You must be in a voice channel to be able to use music command!`,
        ephemeral: true,
      });
    }

    if (
      guild.me.voice.channelId &&
      VoiceChannel.id !== guild.me.voice.channelId
    ) {
      return interaction.reply({
        content: `I'm already playing music in <#${guild.me.voice.channelId}>.`,
      });
    }

    try {
      switch (options.getSubcommand()) {
        case "play": {
          client.distube.play(VoiceChannel, options.getString("query"), {
            textChannel: channel,
            member: member,
          });
          return interaction.reply({ content: `🎶 Request recieved.` });
        }
        case "volume": {
          const volume = options.getNumber("percent");
          if (volume > 100 || volume < 1) {
            return interaction.reply({
              content: `🚫 You have to specify number between 1 and 100!`,
            });
          }
          client.distube.setVolume(VoiceChannel, volume);
          return interaction.reply({
            content: `📶 Volume has been set to \`${volume}%\``,
          });
        }
        case "setting": {
          const queue = client.distube.getQueue(VoiceChannel);

          if (!queue) {
            return interaction.reply({ content: "🚫 There is no queue!" });
          }

          switch (options.getString("options")) {
            case "skip": {
              await queue.skip(VoiceChannel);
              return interaction.reply({ content: "⏭️ Skipped." });
            }
            case "stop": {
              await queue.stop(VoiceChannel);
              return interaction.reply({ content: "⏹️ Stopped." });
            }
            case "pause": {
              await queue.pause(VoiceChannel);
              return interaction.reply({ content: "⏸️ Paused." });
            }
            case "resume": {
              await queue.resume(VoiceChannel);
              return interaction.reply({ content: "▶️ Resumed." });
            }
            case "queue": {
              const listSong = `${queue.songs.map(
                (song, id) =>
                  `\n**${++id}**. ${song.name} - \`${song.formattedDuration}\``
              )}`;
              return interaction.reply({
                embeds: [
                  new MessageEmbed()
                    .setColor("#07C966")
                    .setDescription(listSong),
                ],
              });
            }
          }
        }
      }
    } catch (error) {
      const errorEmbed = new MessageEmbed()
        .setColor("RED")
        .setDescription(`🚫 Alert: ${error}`);
      return interaction.reply({ embeds: [errorEmbed] });
    }
  },
};
