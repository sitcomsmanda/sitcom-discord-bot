module.exports = {
  data: {
    name: "play",
    desc: "memainkan lagu dari youtube",
  },
  async execute(message) {
    await message.channel.send(`🎵 Play`);
    return;
  },
};
