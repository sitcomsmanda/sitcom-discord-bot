require("dotenv").config();

const PREFIX = process.env.PREFIX;

// Fungsi untuk membersihkan pesan command music
const cleanMessage = (oldContent) => {
  let newContents = ``;
  oldContent.split(" ").forEach((msg, i) => {
    if (msg !== "") {
      newContents += i !== 0 ? " " : "";
      newContents += msg;
    }
  });
  return newContents;
};

// Fungsi Dolar Utama yang dipanggil di messageCreate Event
const handleMusicCommands = async (message) => {
  const { author, client } = message;

  // Pencegah masuk function tanpa PREFIX
  if (!(message.content[0] === PREFIX)) return;

  // Membersihkan spasi yang tidak guna
  message.content = cleanMessage(message.content);

  // Menampilkan User yang menggunakan command
  console.log(`${author.username}: ${message.content}`);

  // Mengambil hanya index ke-0 dari rentetan pesan yang di split spasi
  const contentCommand = message.content.split(" ")[0];

  // Mengambil musicCommand di client collection
  const musicCommand = client.musicCommands.get(
    // Substring untuk hanya mengambil kata pertama
    contentCommand
  );

  // Pencegah masuk function tanpa ada musicCommand yang sesuai
  if (!musicCommand) return;

  await musicCommand.execute(message);

  return;
};

module.exports = handleMusicCommands;
