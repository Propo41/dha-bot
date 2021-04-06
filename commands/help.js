// https://discordjs.guide/popular-topics/embeds.html#embed-preview

const Discord = require("discord.js");
module.exports = async function (numEntries, dResponse) {
  const embedMessage = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Help")
    .setDescription("Values marked with * are mandatory")
    .addFields(
      { name: "For getting a gif:", value: "$gif <keyword>" },
      {
        name: "To list all rows:",
        value: "$list <numberOfEntriesToReturn>",
      },
      {
        name: "To save a new entry:",
        value: "$save <title*> <content*> <description> <link>",
      }
    );
    
  dResponse.channel.send(embedMessage);
};
