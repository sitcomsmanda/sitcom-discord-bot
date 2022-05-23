// Memasukan Path dan File Systems Node.js
const path = require("node:path");
const fs = require("node:fs");
// Memasukan Discord API Module/Package untuk input commands
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

// !Function from wpu_bot to draw multiline
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
    // New Line

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
      // modifying calculation (issue 2)
      (opts.rect.height - lastFittingY) / 2;
    // eslint-disable-next-line no-redeclare
    for (var line of lines) {
      // Fill or stroke
      if (opts.stroke) {
        // modified line
        ctx.strokeText(line.text.trim(), line.x, line.y + offset);
      } else if (opts.fillStroke) {
        // modified line
        ctx.strokeText(line.text.trim(), line.x, line.y + offset);
        // modified line
        ctx.fillText(line.text.trim(), line.x, line.y + offset);
      } else {
        // modified line
        ctx.fillText(line.text.trim(), line.x, line.y + offset);
      }
    }

    // Returns font size
    return fontSize;
  } catch (error) {
    console.error(error);
  }
}

// !Fungsi untuk handle_files
function handle_files(folder) {
  // Untuk nyimpen data return
  const array = [];

  // Alamat direktori folder
  const folderPath = path.join(__dirname, `../${folder}`);
  // Array nama-nama Files yang ada di folder dengan aturan ekstensi .js
  const files = fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith(".js"));

  // Looping alamat file-file tersebut
  for (const file of files) {
    // Alamat direktori file
    const filePath = path.join(folderPath, file);
    // Memasukan objek yang ada di file
    const object = require(filePath);
    // Memasukan ke array
    array.push(object);
  }

  return array;
}

// !Fungsi deploy commands ke API Discord
async function deploy_commands(
  commands,
  token,
  clientId,
  mode = "dev",
  guildId = undefined
) {
  // Inisialisasi object RESTful API version dengan token
  const rest = new REST({ option: "9" }).setToken(token);

  // jika dalam mode development (pengembangan)
  if (mode === "build") {
    // Request .put() dengan opsi input commands di global
    await rest
      .put(Routes.applicationCommands(clientId), {
        body: commands,
      })
      .then(() =>
        console.log("Successfully registered application commands globally.")
      )
      .catch(console.error);
  } else {
    // Request .put() dengan opsi input commands di local server discord
    await rest
      .put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commands,
      })
      .then(() =>
        console.log("Successfully registered application commands locally.")
      )
      .catch(console.error);
  }
}

// Distribusi module functions
module.exports = {
  handle_files,
  deploy_commands,
  drawMultilineText,
};
