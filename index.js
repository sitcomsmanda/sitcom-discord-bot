// Memasukan Discord Module/Package
const Discord = require("discord.js");
// Memasukan Discord API Module/Package untuk input commands
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
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
 *!    MEMBACA DIREKTORI ./commands (COMMANDS HANDLER)
 **/
Functions.handle_files("commands").forEach((command) => {
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
});

/**
 *!    MEMBACA DIREKTORI ./events (EVENTS HANDLER)
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

// Variabel penampung object RESTful API
const rest = new REST({ option: "9" }).setToken(config.token);

// Variabel penampung Server ID
const guildId = "912507318464299009";

// Request .put() dengan opsi input commands di local server discord
rest
  .put(Routes.applicationGuildCommands(config.clientId, guildId), {
    body: commands,
  })
  .then(() =>
    console.log("Successfully registered application commands locally.")
  )
  .catch(console.error);

client.login(config.token);
