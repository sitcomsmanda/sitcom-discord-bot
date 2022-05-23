// Distribusi module events dengan nama event "ready"
module.exports = {
  // Nama Event: ready
  name: "ready",
  // kondisi once
  once: true,
  // Method isi Events ready
  async execute() {
    console.log(`SITCOM is ready.`);
  },
};
