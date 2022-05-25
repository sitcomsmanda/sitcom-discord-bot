// Memasukan dotenv config
require("dotenv").config();

// Memasukan Discord Module/Package
const Discord = require("discord.js");

// Memasukan Functions
const { handle_files } = require("./modules/functions.js");
// Memasukan config file yang berisi token
const TOKEN = process.env.TOKEN;

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
handle_files("commands").forEach((command) => {
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
});

/**
 *! MEMBACA DIREKTORI ./events (EVENTS HANDLER)
 **/
handle_files("events").forEach((event) => {
  if (event.once) {
    // Jika tipe event adalah once
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    // Jika tipe event adalah on
    client.on(event.name, (...args) => event.execute(...args));
  }
});

client.login(TOKEN);
