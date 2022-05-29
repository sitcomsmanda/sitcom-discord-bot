require("dotenv").config();

const PREFIX = process.env.PREFIX;

// Fungsi Dolar Utama yang dipanggil di messageCreate Event
const handleMusicCommands = (message) => {
  // Pencegah masuk function tanpa PREFIX
  if (!(message.content[0] === PREFIX)) return;

  // Menampilkan User yang menggunakan command
  console.log(`${message.author.username}: ${message.content}`);

  // Mengambil musicCommand di client collection
  const musicCommand = message.client.musicCommands.get(
    // Substring untuk hanya mengambil kata pertama
    message.content.substring(0)
  );

  // Pencegah masuk function tanpa ada musicCommand yang sesuai
  if (!musicCommand) return;

  musicCommand.execute(message);

  return;
};

module.exports = handleMusicCommands;
