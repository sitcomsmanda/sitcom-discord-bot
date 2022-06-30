// Memasukan dotenv config
require("dotenv").config();

// Memasukan Discord Module/Package
const Discord = require("discord.js");

// Memasukan DisTube Music Bot Module/Package
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { YtDlpPlugin } = require("@distube/yt-dlp");

// Memasukan handleFiles Functions
const handleFiles = require("./modules/handleFiles.js");

// Memasukan config file ke masing-masing konstanta
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;
const CLIENT_ID_SPOTIFY = process.env.CLIENT_ID_SPOTIFY;
const CLIENT_SECRET_SPOTIFY = process.env.CLIENT_SECRET_SPOTIFY;

const main = async () => {
	// Opsi Intens
	const options = {
		intents: [
			Discord.Intents.FLAGS.GUILDS,
			Discord.Intents.FLAGS.GUILD_MEMBERS,
			Discord.Intents.FLAGS.GUILD_MESSAGES,
			Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
			Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
			Discord.Intents.FLAGS.GUILD_PRESENCES,
			Discord.Intents.FLAGS.GUILD_WEBHOOKS,
			Discord.Intents.FLAGS.GUILD_VOICE_STATES,
		],
		allowedMentions: {
			parse: ["users", "roles"],
		},
	};

	// Inisialisasi object client utama
	const client = new Discord.Client(options);

	// Overwrite Console.log method
	console.log = async (msg) => {
		process.stdout.write(msg + "\n");

		const ch = client.channels.cache.find(
			(channel) => channel.name === "sitcom-bot-log"
		);

		if (!ch) return;
		await ch.send(msg);
	};

	// Membuat property prefix untuk diakses di file lain
	client.prefix = PREFIX;
	// Membuat property slashCommands
	client.slashCommands = new Discord.Collection();
	// Membuat property messageCommands
	client.messageCommands = new Discord.Collection();
	// Membuat property musicCommands
	client.musicCommands = new Discord.Collection();

	/**
	 *! MEMBACA DIREKTORI ./commands/slash (Slash Commands)
	 **/
	handleFiles("commands/slash").forEach((command) => {
		client.slashCommands.set(command.data.name, command);
	});

	/**
	 *! MEMBACA DIREKTORI ./commands/message (Message Commands)
	 **/
	handleFiles("commands/message").forEach((messageCommand) => {
		const commandName = messageCommand.data.name;
		messageCommand.data.name = PREFIX + commandName;
		client.messageCommands.set(messageCommand.data.name, messageCommand);
	});

	/**
	 *! MEMBACA DIREKTORI ./commands/music (MUSIC COMMANDS HANDLER)
	 **/
	handleFiles("commands/music").forEach((musicCommand) => {
		const commandName = musicCommand.data.name;
		musicCommand.data.name = PREFIX + commandName;
		client.musicCommands.set(musicCommand.data.name, musicCommand);
	});

	/**
	 *! MEMBACA DIREKTORI ./events/discord (Discord Events Handler)
	 **/
	handleFiles("events/discord").forEach((event) => {
		if (event.once) {
			// Jika tipe event adalah once
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			// Jika tipe event adalah on
			client.on(event.name, (...args) => event.execute(...args));
		}
	});

	// Opsi DisTube
	const distubeOptions = {
		youtubeDL: false,
		updateYouTubeDL: false,
		emitNewSongOnly: true,
		emitAddSongWhenCreatingQueue: false,
		leaveOnFinish: true,
		plugins: [
			new YtDlpPlugin(),
			new SpotifyPlugin({
				parallel: true,
				emitEventsAfterFetching: false,
				api: {
					clientId: CLIENT_ID_SPOTIFY,
					clientSecret: CLIENT_SECRET_SPOTIFY,
				},
			}),
		],
	};

	client.distube = new DisTube(client, distubeOptions);

	/**
	 *! MEMBACA DIREKTORI ./events/distube (DisTube Events Handler)
	 **/
	handleFiles("events/distube").forEach((distubeEvent) => {
		client.distube.on(distubeEvent.name, (...args) =>
			distubeEvent.execute(...args)
		);
	});

	await client.login(TOKEN);
};

try {
	main();
} catch (error) {
	console.error(error);
}
