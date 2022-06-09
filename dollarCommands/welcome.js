const { Join } = require("../modules/perkenalan.js");

// Distribusi module dollar command dengan nama "ping"
module.exports = {
  data: {
    name: "welcome",
    desc: "test welcome message",
  },
  async execute(message) {
    const { client } = message;
    Join(message.member, client);
  },
};
