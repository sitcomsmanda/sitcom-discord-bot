require("dotenv").config();

const PREFIX = process.env.PREFIX;

// Fungsi Dolar Utama yang dipanggil di messageCreate Event
const handleDollarCommands = (message) => {
  // Pencegah masuk function tanpa PREFIX
  if (!(message.content[0] === PREFIX)) return;

  // Mengambil dollarCommand di client collection
  const dollarCommand = message.client.dollarCommands.get(
    // Substring untuk hanya mengambil kata pertama
    message.content.substring(0)
  );

  // Pencegah masuk function tanpa ada dollarCommand yang sesuai
  if (!dollarCommand) return;

  dollarCommand.execute(message);

  return;
};

module.exports = handleDollarCommands;
