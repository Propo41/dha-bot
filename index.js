const Discord = require("discord.js");
require("dotenv").config();
const client = new Discord.Client();
const commandHandler = require("./commands");

// triggered when bot is online
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// triggered when bot receives a message
client.on("message", commandHandler);


// this is the bot token found in discord console
client.login(process.env.BOT_TOKEN);


