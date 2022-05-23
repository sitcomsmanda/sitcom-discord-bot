// Memasukan Path dan File Systems Node.js
const path = require("node:path");
const fs = require("node:fs");
// Memasukan Discord Module/Package
const Discord = require("discord.js");
// Memasukan Discord API Module/Package untuk input commands
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
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

/**
 *
 *!    MEMBACA DIREKTORI ./commands (COMMANDS HANDLER)
 *
 **/

// Membuat property commands yang isinya object Collection
client.commands = new Discord.Collection();

// Variabel array kosong penampung commands
const commands = [];

// Variabel alamat direktori ./commands
const commandsPath = path.join(__dirname, "commands");
// Variabel Array nama-nama Files yang ada di ./commands dengan aturan ekstensi .js
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

// Looping alamat file-file tersebut
for (const file of commandFiles) {
  // Variabel alamat direktori commands
  const filePath = path.join(commandsPath, file);
  // Memasukan objek Command Package
  const command = require(filePath);
  // Memasukan objek tersebut ke dalam commands Collection di client
  client.commands.set(command.data.name, command);
  // Memasukan hanya property data yang diubah JSON ke dalam array commands
  commands.push(command.data.toJSON());
}

/**
 *
 *!    MEMBACA DIREKTORI ./events (EVENTS HANDLER)
 *
 **/

// Variabel alamat direktori ./events
const eventsPath = path.join(__dirname, "events");
// Variabel Array nama-nama Files yang ada di ./events dengan aturan ekstensi .js
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

// Looping alamat file-file tersebut
for (const file of eventFiles) {
  // Variabel alamat direktori event
  const filePath = path.join(eventsPath, file);
  // Memasukan objek Event Package
  const event = require(filePath);
  // Otomatis memilih tipe event
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

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
