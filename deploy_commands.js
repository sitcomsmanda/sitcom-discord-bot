require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const handleFiles = require("./modules/handleFiles.js");
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

// !Fungsi deploy commands ke API Discord
const deploy_commands = async () => {
  // Inisialisasi object RESTful API version dengan token
  const rest = new REST({ option: "9" }).setToken(TOKEN);

  // Array kosong penampung commands
  const commands = [];

  /**
   *! MEMBACA DIREKTORI ./commands (COMMANDS HANDLER)
   **/
  handleFiles("commands").forEach((command) => {
    commands.push(command.data.toJSON());
  });

  try {
    console.log("Started refreshing application (/) commands.");
    const res = await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      {
        body: commands,
      }
    );
    console.log("Successfully reloaded application (/) commands.");
    return res;
  } catch (error) {
    console.error(error);
    return false;
  }

  // jika dalam mode development (pengembangan)
  // if (mode === "build") {
  //   // Request .put() dengan opsi input commands di global
  //   await rest
  //     .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
  //       body: commands,
  //     })
  //     .then(() =>
  //       console.log("Successfully registered application commands globally.")
  //     )
  //     .catch(console.error);
  // } else {
  //   // Request .put() dengan opsi input commands di local server discord
  //   await rest
  //     .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
  //       body: commands,
  //     })
  //     .then(() =>
  //       console.log("Successfully registered application commands locally.")
  //     )
  //     .catch(console.error);
  // }
};

deploy_commands();
