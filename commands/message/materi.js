// Distribusi module dollar command dengan nama "materi"
module.exports = {
  data: {
    name: "materi",
    desc: "melihat link materi",
  },
  async execute(message) {
    await message.channel.send(
      `📁 https://drive.google.com/drive/folders/1tuo6zoewZ0f1t4KDuFiHviVRTQplnd3n?usp=sharing`
    );
    return;
  },
};
