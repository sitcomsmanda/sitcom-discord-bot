// Memasukan Path dan File Systems Node.js
const path = require("node:path");
const fs = require("node:fs");
// Memasukan Discord API Module/Package untuk input commands
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

// Distribusi module functions
module.exports = {
  // !Fungsi untuk handle_files
  handle_files(folder) {
    // Untuk nyimpen data return
    const array = [];

    // Alamat direktori folder
    const folderPath = path.join(__dirname, `../${folder}`);
    // Array nama-nama Files yang ada di folder dengan aturan ekstensi .js
    const files = fs
      .readdirSync(folderPath)
      .filter((file) => file.endsWith(".js"));

    // Looping alamat file-file tersebut
    for (const file of files) {
      // Alamat direktori file
      const filePath = path.join(folderPath, file);
      // Memasukan objek yang ada di file
      const object = require(filePath);
      // Memasukan ke array
      array.push(object);
    }

    return array;
  },

  // !Fungsi deploy commands ke API Discord
  async deploy_commands(
    commands,
    token,
    clientId,
    mode = "dev",
    guildId = undefined
  ) {
    // Inisialisasi object RESTful API version dengan token
    const rest = new REST({ option: "9" }).setToken(token);

    // jika dalam mode development (pengembangan)
    if (mode === "build") {
      // Request .put() dengan opsi input commands di global
      await rest
        .put(Routes.applicationCommands(clientId), {
          body: commands,
        })
        .then(() =>
          console.log("Successfully registered application commands globally.")
        )
        .catch(console.error);
    } else {
      // Request .put() dengan opsi input commands di local server discord
      await rest
        .put(Routes.applicationGuildCommands(clientId, guildId), {
          body: commands,
        })
        .then(() =>
          console.log("Successfully registered application commands locally.")
        )
        .catch(console.error);
    }
  },
};
