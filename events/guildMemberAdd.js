const { MessageEmbed, MessageAttachment } = require("discord.js");
// Memasukan Canvas
const Canvas = require("@napi-rs/canvas");
const { readFile } = require("fs/promises");

// Handle untuk panjang nama yang kegedean
const applyText = (canvas, text) => {
  const context = canvas.getContext("2d");

  // deklarasi ukuran font awal
  let fontSize = 70;

  do {
    // masukan font ke context dan decrease
    context.font = `${(fontSize -= 10)}px sans-serif`;
    // Bandingkan lebar pixel text ke canvas dan dikurangin ukuran avatar
  } while (context.measureText(text).width > canvas.width - 300);

  // balikan hasilnya ke canvas
  return context.font;
};

// Distribusi module events dengan nama event "guildMemberAdd"
// Yaitu ketika ada member masuk server
module.exports = {
  // Nama Event: guildMemberAdd
  name: "guildMemberAdd",
  // Method isi Event guildMemberAdd
  async execute(member) {
    console.log(member.user);

    const name = member.user.username;

    // Bikin canvas
    const canvas = Canvas.createCanvas(720, 404);
    const context = canvas.getContext("2d");

    // Masukin background
    const backgroundFile = await readFile("./wallpaper.jpg");
    const background = new Canvas.Image();
    background.src = backgroundFile;

    // Simpen gambar sesuai ukuran canvas
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    // warna untuk stroke
    context.strokeStyle = "#07C966";

    // gambar rectangle (persegi) dengan dimensi se canvas
    context.strokeRect(0, 0, canvas.width, canvas.height);

    context.font = "28px sans-serif";
    context.fillStyle = "#ffffff";
    context.fillText("Welcome,", canvas.width / 2.5, canvas.height / 3.5);

    // gambar font warna putih dengan name
    context.font = applyText(canvas, `${name}!`);
    context.fillStyle = "#ffffff";
    context.fillText(`${name}!`, 25, canvas.height / 1.8);

    // Use the helpful Attachment class structure to process the file for you
    const attachment = new MessageAttachment(
      canvas.toBuffer("image/png"),
      "welcome.png"
    );

    const welcomeEmbed = new MessageEmbed()
      .setColor("#07C966")
      .setTitle(`Halo ${member.user.username}!`)
      .setDescription(
        `Selamat datang di server discord\n**SITCOM** (Student IT Community)\n\nDiharapkan untuk membaca **Peraturan** di <#978124379013644298> terlebih dahulu!\n\nDilanjutkan ke <#978124379013644298> untuk berkenalan sesuai format.\n\nJika ada pertanyaan, jangan malu untuk bertanya kepada __Ketua__`
      )
      .setImage("attachment://welcome.png")
      .setTimestamp()
      .setFooter({
        text: `${member.user.username}`,
        iconURL: `${member.user.displayAvatarURL()}`,
      });

    member.guild.channels.cache.get("912507318929858600").send({
      content: `Selamat datang ${member.user}!`,
      embeds: [welcomeEmbed],
      files: [attachment],
    });
  },
};
// member.name untuk ngambil nama server
