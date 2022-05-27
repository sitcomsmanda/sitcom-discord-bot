// Memasukan Path dan File Systems Node.js
const path = require("node:path");
const fs = require("node:fs");

// !Fungsi untuk handle_files
const handleFiles = (folder) => {
  try {
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
  } catch (error) {
    console.error;
  }
};

module.exports = handleFiles;
