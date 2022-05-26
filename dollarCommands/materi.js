// Distribusi module dollar command dengan nama "materi"
module.exports = {
  data: {
    name: "materi",
  },
  async execute(message) {
    message.channel.send(
      `📁 https://drive.google.com/drive/folders/1tuo6zoewZ0f1t4KDuFiHviVRTQplnd3n?usp=sharing`
    );
    return;
  },
};
