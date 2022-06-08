const path = require("path");
const { registerFont, loadImage, createCanvas } = require("canvas");
const { MessageAttachment, MessageEmbed } = require("discord.js");
const { deleteMsg, sendTempMsg } = require("./utility.js");

const CHANNEL_LOBBY = process.env.CHANNEL_LOBBY;
const CHANNEL_PERKENALAN = process.env.CHANNEL_PERKENALAN;
const ROLES_KELAS10 = process.env.ROLES_KELAS10;
const ROLES_KELAS11 = process.env.ROLES_KELAS11;
const ROLES_KELAS12 = process.env.ROLES_KELAS12;
const ROLES_MEMBER = process.env.ROLES_MEMBER;

const fontPath = path.resolve("./assets/fonts/BebasNeue-Regular.ttf");
registerFont(fontPath, { family: "Bebas Neue", weight: 400 });

const Perkenalan = async (msg, client) => {
  try {
    if (msg.channelId !== CHANNEL_PERKENALAN || msg.author.bot === true) return;
    const split = msg.content.split(/\n/gm);
    const user = msg.author;
    const wrongFormatMsg = {
      content: `<@${user.id}> , tolong masukkan data sesuai format!`,
      allowedMentions: { users: [user.id] },
    };
    const wrongKelasMsg = {
      content: `<@${user.id}> , data kelas tidak sesuai format (X, XI, XII)!`,
      allowedMentions: { users: [user.id] },
    };
    const alreadyIntroduced = {
      content: `<@${user.id}> , kamu sudah berkenalan!`,
      allowedMentions: { users: [user.id] },
    };
    const replyMsg = {
      content: `Terima kasih <@${user.id}> sudah memperkenalkan diri sesuai format, salam kenal ya!`,
      allowedMentions: { users: [user.id] },
    };

    const roles = msg.member.roles.cache;

    // check if user already introduce
    if (roles.has(ROLES_MEMBER)) {
      if (
        roles.has(ROLES_KELAS10) ||
        roles.has(ROLES_KELAS11) ||
        roles.has(ROLES_KELAS12)
      ) {
        deleteMsg(msg);
        sendTempMsg(msg.channel, alreadyIntroduced);
        return;
      }
    }

    if (split.length !== 5) {
      deleteMsg(msg);
      sendTempMsg(msg.channel, wrongFormatMsg);
      return;
    }

    if (
      split[0].includes("Nama:") &&
      split[1].includes("Kelas:") &&
      split[2].includes("Hobi:") &&
      split[3].includes("Asal SMP:") &&
      split[4].includes("Tujuan masuk sitcom:")
    ) {
      // Send data
      const data = {
        author_id: user.id,
        channel_id: msg.channelId,
        message_id: msg.id,
        message_content: msg.content,
        nama: split[0].replace("Nama:", "").trim(),
        kelas: split[1].replace("Kelas:", "").trim(),
        hobi: split[2].replace("Hobi:", "").trim(),
        asalSmp: split[3].replace("Asal SMP:", "").trim(),
        tujuan: split[4].replace("Tujuan masuk sitcom:", "").trim(),
      };

      const nameRE = new RegExp(/^(([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+)$/, "mg");

      // Validate name
      if (
        (data.nama.length >= 50 || data.nama.length <= 3) &&
        !data.nama.match(nameRE)
      ) {
        deleteMsg(msg);
        sendTempMsg(msg.channel, wrongFormatMsg);
        return;
      }

      const kelas = data.kelas.toUpperCase();

      if (
        kelas.at(0) == "X" &&
        kelas.at(1) == "I" &&
        kelas.at(2) == "I" &&
        kelas.at(3) != "I"
      ) {
        await msg.member.roles.add([ROLES_MEMBER, ROLES_KELAS12]);
      } else if (
        kelas.at(0) == "X" &&
        kelas.at(1) == "I" &&
        kelas.at(2) != "I"
      ) {
        await msg.member.roles.add([ROLES_MEMBER, ROLES_KELAS11]);
      } else if (kelas.at(0) == "X" && kelas.at(1) != "I") {
        await msg.member.roles.add([ROLES_MEMBER, ROLES_KELAS10]);
      } else {
        deleteMsg(msg);
        sendTempMsg(msg.channel, wrongKelasMsg);
        return;
      }

      // Add Reaction
      msg.react("✅");

      // Reply
      await msg.channel.send(replyMsg);

      // Save to db
      try {
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      deleteMsg(msg);
      sendTempMsg(msg.channel, wrongFormatMsg);
      return;
    }
  } catch (error) {
    console.error(error);
  }
};

const Join = async (guildMember, client) => {
  try {
    const username = guildMember.user.username;
    const user = guildMember.user;
    const imageBuffer = await createBanner(username);
    const perkenalanCh = await client.channels.fetch(CHANNEL_LOBBY);
    const attachment = new MessageAttachment(imageBuffer, "welcome.png");

    let messages = `Selamat datang di server discord\n`;
    messages += `**SITCOM** (Student IT Community)\n`;
    messages += `\n`;
    messages += `Diharapkan untuk membaca **Peraturan** di <#902006311967928411> terlebih dahulu!\n`;
    messages += `\n`;
    messages += `Lalu ke <#902096654444920872> untuk berkenalan **sesuai format**.\n`;
    messages += `\n`;
    messages += `Jika ada pertanyaan, jangan malu untuk bertanya kepada __Ketua__\n`;

    const embed = new MessageEmbed()
      .setColor("#07C966")
      .setTitle(`Hallo, ${username}`)
      .setDescription(messages)
      .setThumbnail(guildMember.avatarURL())
      .setImage("attachment://welcome.png")
      .setTimestamp()
      .setFooter({
        text: `${user.username}`,
        iconURL: `${user.displayAvatarURL()}`,
      });

    perkenalanCh.send({
      content: `<@${user.id}> Selamat Datang!`,
      allowedMentions: { users: [user.id] },
      embeds: [embed],
      files: [attachment],
    });
  } catch (error) {
    console.error(error);
  }
};

async function createBanner(nama) {
  try {
    const canvas = createCanvas(960, 540);
    const background = await loadImage(
      path.join(__dirname, "..", "assets", "images", "welcome.png")
    );

    const ctx = canvas.getContext("2d");

    // Draw background
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Set fonts
    ctx.strokeStyle = "rgb(35, 150, 200)";
    ctx.fillStyle = "rgb(255, 255, 255)";

    if (nama.length > 15) nama = nama.slice(0, 15) + "...";

    // Draw text
    drawMultilineText(ctx, `Welcome, \n ${nama} \n Enjoy your stay!`, {
      rect: {
        x: 75,
        y: 90,
        width: 615,
        height: 540,
      },
      font: "Bebas Neue",
      verbose: false,
      lineHeight: 1,
      minFontSize: 100,
      maxFontSize: 100,
      fillStroke: true,
    });

    // Save to buffer
    return canvas.toBuffer();
  } catch (error) {
    console.error(error);
  }
}

function drawMultilineText(ctx, text, opts) {
  try {
    // Default options
    if (!opts) opts = {};
    if (!opts.font) opts.font = "sans-serif";
    if (typeof opts.stroke == "undefined") opts.stroke = false;
    if (typeof opts.verbose == "undefined") opts.verbose = false;
    if (!opts.rect) {
      opts.rect = {
        x: 0,
        y: 0,
        width: ctx.canvas.width,
        height: ctx.canvas.height,
      };
    }
    if (!opts.lineHeight) opts.lineHeight = 1.1;
    if (!opts.minFontSize) opts.minFontSize = 30;
    if (!opts.maxFontSize) opts.maxFontSize = 100;
    if (!opts.logFunction) {
      opts.logFunction = function (message) {
        console.log(message);
      };
    }

    const words = text.split("\n");
    if (opts.verbose) {
      opts.logFunction("Text contains " + words.length + " words");
    }

    var lines = [];
    let y;

    let lastFittingLines;
    let lastFittingFont;
    let lastFittingY;
    let lastFittingLineHeight;
    for (
      var fontSize = opts.minFontSize;
      fontSize <= opts.maxFontSize;
      fontSize++
    ) {
      // Line height
      var lineHeight = fontSize * opts.lineHeight;

      // Set font for testing with measureText()
      ctx.font = " " + fontSize + "px " + opts.font;

      // Start
      var x = opts.rect.x;
      y = lineHeight;
      lines = [];
      var line = "";

      // Cycles on words
      for (var word of words) {
        var linePlus = line + word + " ";
        if (ctx.measureText(linePlus).width > opts.rect.width) {
          lines.push({ text: line, x: x, y: y });
          line = word + " ";
          y += lineHeight;
        } else {
          line = linePlus;
        }
      }

      lines.push({ text: line, x: x, y: y });

      if (y > opts.rect.height) break;

      lastFittingLines = lines;
      lastFittingFont = ctx.font;
      lastFittingY = y;
      lastFittingLineHeight = lineHeight;
    }

    lines = lastFittingLines;
    ctx.font = lastFittingFont;
    if (opts.verbose) opts.logFunction("Font used: " + ctx.font);
    const offset =
      opts.rect.y -
      lastFittingLineHeight / 2 +
      (opts.rect.height - lastFittingY) / 2;
    // eslint-disable-next-line no-redeclare
    for (var line of lines) {
      // Fill or stroke
      if (opts.stroke) {
        ctx.strokeText(line.text.trim(), line.x, line.y + offset);
      } else if (opts.fillStroke) {
        ctx.strokeText(line.text.trim(), line.x, line.y + offset);
        ctx.fillText(line.text.trim(), line.x, line.y + offset);
      } else {
        ctx.fillText(line.text.trim(), line.x, line.y + offset);
      }
    }

    // Returns font size
    return fontSize;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  Join,
  Perkenalan,
};
