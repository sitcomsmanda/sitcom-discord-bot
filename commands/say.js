// Memasukan Builders Commands Discord Package
const { SlashCommandBuilder } = require("@discordjs/builders");
// Memasukan Canvas
const { MessageAttachment } = require("discord.js");
const Canvas = require("@napi-rs/canvas");
const { readFile } = require("fs/promises");
const { request } = require("undici");

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

// Distribusi module command dengan nama "profile"
module.exports = {
  // Data Command "profile"
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Replies with what you say!")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("What are you going to say?")
        .setRequired(true)
    ),
  // Method isi Command "profile"
  async execute(interaction) {
    // text buat di canvas
    const heading = interaction.options.getString("message");

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

    // gambar font warna putih dengan heading
    context.font = applyText(canvas, heading);
    context.fillStyle = "#ffffff";
    context.fillText(heading, canvas.width / 2.5, canvas.height / 1.8);

    // Nge buat profile picture jadi bulet
    // Pick up the pen
    context.beginPath();
    // Start the arc to form a circle
    context.arc(125, 201, 100, 0, Math.PI * 2, true);
    // Put the pen down
    context.closePath();
    // Clip off the region you drew on
    context.clip();

    // Ngambil picture user
    const { body } = await request(
      interaction.user.displayAvatarURL({ format: "jpg" })
    );

    // masukin picturenya ke canvas gambar
    const avatar = new Canvas.Image();
    avatar.src = Buffer.from(await body.arrayBuffer());

    // Gambar picture nya ke canvas
    context.drawImage(avatar, 25, canvas.height / 4, 200, 200);

    // Use the helpful Attachment class structure to process the file for you
    const attachment = new MessageAttachment(
      canvas.toBuffer("image/png"),
      "profile-image.png"
    );

    interaction.reply({
      content: `${interaction.user.username}'s say:`,
      files: [attachment],
    });
  },
};
