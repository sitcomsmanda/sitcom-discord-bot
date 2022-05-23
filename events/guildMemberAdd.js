const { MessageEmbed, MessageAttachment } = require("discord.js");
const Functions = require("../functions/functions.js");
// Memasukan Canvas
const Canvas = require("@napi-rs/canvas");
const { readFile } = require("fs/promises");

// Distribusi module events dengan nama event "guildMemberAdd"
// Yaitu ketika ada member masuk server
module.exports = {
  // Nama Event: guildMemberAdd
  name: "guildMemberAdd",
  // Method isi Event guildMemberAdd
  async execute(member) {
    console.log(member.user);

    let name = member.user.username;

    // Bikin canvas
    const canvas = Canvas.createCanvas(960, 540);
    const context = canvas.getContext("2d");

    // Masukin background
    const backgroundFile = await readFile("./wallpaper.jpg");
    const background = new Canvas.Image();
    background.src = backgroundFile;

    // Simpen gambar sesuai ukuran canvas
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    if (name.length > 15) name = name.slice(0, 15) + "...";

    // Set fonts
    context.strokeStyle = "rgb(35, 150, 200)";
    context.fillStyle = "rgb(255, 255, 255)";

    // Draw text
    Functions.drawMultilineText(
      context,
      `Welcome, \n ${name} \n Enjoy your stay!`,
      {
        rect: {
          x: 75,
          y: 90,
          width: 615,
          height: 404,
        },
        font: "Bebas Neue",
        verbose: false,
        lineHeight: 1,
        minFontSize: 100,
        maxFontSize: 100,
        fillStroke: true,
      }
    );

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

    member.guild.channels.cache.get("902004102974828606").send({
      content: `Selamat datang ${member.user}!`,
      embeds: [welcomeEmbed],
      files: [attachment],
    });
  },
};
// member.name untuk ngambil nama server
