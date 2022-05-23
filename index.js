// Memasukan Discord Module/Package
const Discord = require("discord.js");

// Memasukan server module
const keepAlive = require("./server.js");

// Memasukan Functions
const Functions = require("./functions/functions.js");
// Memasukan config file yang berisi token dan guildId
const config = require("./config.json");

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

// Array kosong penampung commands
const commands = [];

/**
 *! MEMBACA DIREKTORI ./commands (COMMANDS HANDLER)
 **/
Functions.handle_files("commands").forEach((command) => {
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
});

/**
 *! MEMBACA DIREKTORI ./events (EVENTS HANDLER)
 **/
Functions.handle_files("events").forEach((event) => {
  if (event.once) {
    // Jika tipe event adalah once
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    // Jika tipe event adalah on
    client.on(event.name, (...args) => event.execute(...args));
  }
});

// Server ID
const guildId = "902004102001729588";

/**
 *! Mengirim Commands menuju Discord API
 *      argument "dev" menyatakan sedang dalam proses development
 *      jadi commands dikirim hanya ke guildId yang tertera
 **/
Functions.deploy_commands(
  commands,
  config.token,
  config.clientId,
  "dev",
  guildId
);

keepAlive();
client.login(config.token);
