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

// Distribusi module functions
module.exports = drawMultilineText;
