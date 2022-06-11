// Fungsi messageCommands yang dipanggil di messageCreate Event
const messageCommands = (message) => {
  const { client } = message;
  // Pencegah masuk function tanpa PREFIX
  if (!(message.content[0] === client.prefix)) return;

  // Mengambil hanya index ke-0 dari rentetan pesan yang di split spasi
  const contentCommand = message.content.split(" ")[0];

  // Mengambil messageCommand di client collection
  const messageCommand = client.messageCommands.get(contentCommand);

  // Pencegah masuk function tanpa ada messageCommand yang sesuai
  if (!messageCommand) return;

  messageCommand.execute(message);

  return;
};

module.exports = messageCommands;
