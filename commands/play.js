/**
 * plays an audio file randomly
 */
var fs = require("fs");
const Discord = require("discord.js");
const { exception } = require("console");

// npm i ffmpeg-static
// npm i @discordjs/opus
module.exports = async function (keyword, dResponse) {
  // Join the same voice channel of the author of the message
  if (dResponse.member.voice.channel) {
    var fileNames = fs.readdirSync("./raw/");
    const connection = await dResponse.member.voice.channel.join();
    if (keyword == undefined || keyword=="") {
      var index = Math.floor(Math.random() * fileNames.length);
      // Create a dispatcher
      const dispatcher = connection.play(`./raw/${fileNames[index]}`, {
        volume: 1,
      });
      dispatcher.on("error", console.error);
      embedMessagePlaying(dResponse, fileNames[index]);

    } else if (keyword[0] == "help") {
      const embedMessage = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Sound files available:")
        .setDescription("To play a sound, type: $play <filename>");

      var i = 1;
      fileNames.forEach((element) => {
        embedMessage.addField(
          `${i}. ${element.split(".")[0]}`,
          `$play ${element}`
        );
        i++;
      });

      dResponse.channel.send(embedMessage);
    } else {
      if (fileNames.includes(keyword[0])) {
        const dispatcher = connection.play(`./raw/${keyword[0]}`, {
          volume: 1,
        });
        embedMessagePlaying(dResponse, keyword[0]);
        dispatcher.on("error", console.error);
      } else {
        console.log("incorrect sytanx");
        const embedMessage = new Discord.MessageEmbed()
          .setColor("#FF3B0C")
          .setTitle("Incorrect syntax dumbass!")
          .setDescription("To play a sound, type: $play <filename>, or $play");
        dResponse.channel.send(embedMessage);
      }
    }
  }
};


function embedMessagePlaying(res, playingFile){
    const embedMessage = new Discord.MessageEmbed()
    .setColor("#FF3B0C")
    .setTitle(`Playing ${playingFile}..`);
    res.channel.send(embedMessage);
}