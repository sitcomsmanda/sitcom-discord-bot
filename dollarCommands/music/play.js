module.exports = {
  data: {
    name: "play",
    desc: "memainkan lagu dari youtube",
  },
  async execute(message) {
    const { content } = message;
    await message.channel.send(`🎵 Play: ${content}`);
    return;
  },
};
