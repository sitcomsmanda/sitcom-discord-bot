// Fungsi Dolar Utama yang dipanggil di messageCreate Event
const handleDollarCommands = (message) => {
  const { client } = message;
  // Pencegah masuk function tanpa PREFIX
  if (!(message.content[0] === client.prefix)) return;

  // Mengambil hanya index ke-0 dari rentetan pesan yang di split spasi
  const contentCommand = message.content.split(" ")[0];

  // Mengambil dollarCommand di client collection
  const dollarCommand = client.dollarCommands.get(contentCommand);

  // Pencegah masuk function tanpa ada dollarCommand yang sesuai
  if (!dollarCommand) return;

  dollarCommand.execute(message);

  return;
};

module.exports = handleDollarCommands;
