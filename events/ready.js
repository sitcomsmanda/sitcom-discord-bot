// Distribusi module events dengan nama event "ready"
module.exports = {
  // Nama Event: ready
  name: "ready",
  // kondisi once
  once: true,
  // Method isi Events ready
  async execute(client) {
    const activity = "$help";
    const type = "LISTENING";
    const status = "dnd";
    client.user.setPresence({
      activities: [{ name: activity, type: type }],
      status: status,
    });
    console.log(
      `SITCOM is ready.\nactivites: "${activity}", status: ${status}`
    );
  },
};
