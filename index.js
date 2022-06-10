// Memasukan dotenv config
require("dotenv").config();

// Memasukan Discord Module/Package
const Discord = require("discord.js");

// Memasukan Functions
const handleFiles = require("./modules/handleFiles.js");
// Memasukan config file yang berisi token
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;
const CLIENT_ID_SPOTIFY = process.env.CLIENT_ID_SPOTIFY;
const CLIENT_SECRET_SPOTIFY = process.env.CLIENT_SECRET_SPOTIFY;

const main = async () => {
  // Opsi Intens
  const options = {
    intents: [
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MEMBERS,
      Discord.Intents.FLAGS.GUILD_MESSAGES,
      Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
      Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Discord.Intents.FLAGS.GUILD_PRESENCES,
      Discord.Intents.FLAGS.GUILD_WEBHOOKS,
      Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    ],
    allowedMentions: {
      parse: ["users", "roles"],
    },
  };

  // Inisialisasi object client utama
  const client = new Discord.Client(options);

  // Membuat property commands yang isinya object Collection
  client.prefix = PREFIX;
  // Membuat property commands yang isinya object Collection
  client.commands = new Discord.Collection();
  // Membuat property dollarCommands yang isinya object Collection
  client.dollarCommands = new Discord.Collection();
  // Membuat property musicCommands yang isinya object Collection
  client.musicCommands = new Discord.Collection();

  /**
   *! MEMBACA DIREKTORI ./commands (COMMANDS HANDLER)
   **/
  handleFiles("commands").forEach((command) => {
    client.commands.set(command.data.name, command);
  });

  /**
   *! MEMBACA DIREKTORI ./dollarCommands (DOLLAR COMMANDS HANDLER)
   **/
  handleFiles("dollarCommands").forEach((dollarCommand) => {
    const commandName = dollarCommand.data.name;
    dollarCommand.data.name = PREFIX + commandName;
    client.dollarCommands.set(dollarCommand.data.name, dollarCommand);
  });

  /**
   *! MEMBACA DIREKTORI ./dollarCommands/music (MUSIC COMMANDS HANDLER)
   **/
  handleFiles("dollarCommands/music").forEach((musicCommand) => {
    const commandName = musicCommand.data.name;
    musicCommand.data.name = PREFIX + commandName;
    client.musicCommands.set(musicCommand.data.name, musicCommand);
  });

  /**
   *! MEMBACA DIREKTORI ./events (EVENTS HANDLER)
   **/
  handleFiles("events").forEach((event) => {
    if (event.once) {
      // Jika tipe event adalah once
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      // Jika tipe event adalah on
      client.on(event.name, (...args) => event.execute(...args));
    }
  });

  /**
   *! DisTube Init
   **/
  const { DisTube } = require("distube");
  const { SpotifyPlugin } = require("@distube/spotify");
  const { YtDlpPlugin } = require("@distube/yt-dlp");

  const distubeOptions = {
    youtubeDL: false,
    updateYouTubeDL: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    leaveOnFinish: true,
    plugins: [
      new YtDlpPlugin(),
      new SpotifyPlugin({
        parallel: true,
        emitEventsAfterFetching: false,
        api: {
          clientId: CLIENT_ID_SPOTIFY,
          clientSecret: CLIENT_SECRET_SPOTIFY,
        },
      }),
    ],
  };

  client.distube = new DisTube(client, distubeOptions);

  /**
   *! MEMBACA DIREKTORI ./events/distube (DisTube Events Handler)
   **/
  handleFiles("events/distube").forEach((distubeEvent) => {
    client.distube.on(distubeEvent.name, (...args) =>
      distubeEvent.execute(...args)
    );
  });

  await client.login(TOKEN);
};

try {
  main();
} catch (error) {
  console.error(error);
}
