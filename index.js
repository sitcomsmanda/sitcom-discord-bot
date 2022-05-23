// Memasukan Path dan File Systems Node.js
const path = require("node:path");
const fs = require("node:fs");
// Memasukan Discord Module/Package
const Discord = require("discord.js");
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

client.once("ready", () => {
  console.log(`SITCOM is ready.`);
});

/**
 *
 *!    MEMBACA DIREKTORI ./commands
 *
 **/

// Membuat property commands yang isinya object Collection
client.commands = new Discord.Collection();

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
}

client.login(config.token);
