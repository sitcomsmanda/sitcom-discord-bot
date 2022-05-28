// Memasukan dotenv config
require("dotenv").config();

// Memasukan Discord Module/Package
const Discord = require("discord.js");

// Memasukan Functions
const handleFiles = require("./modules/handleFiles.js");
// Memasukan config file yang berisi token
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;

// Inisialisasi object client utama
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
  ],
});

// Membuat property commands yang isinya object Collection
client.commands = new Discord.Collection();
// Membuat property dollarCommands yang isinya object Collection
client.dollarCommands = new Discord.Collection();

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
client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  leaveOnFinish: true,
  plugins: [new SpotifyPlugin()],
});

client.login(TOKEN);
