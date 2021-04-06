const gif = require("./commands/gif.js");
const save = require("./commands/save.js");
const list = require("./commands/list.js");
const help = require("./commands/help.js");
const play = require("./commands/play.js");

const commands = {
  gif,
  save,
  list,
  help,
  play,
};
module.exports = function (res) {
  let tokens = res.content.split(" ");
  let command = tokens.shift(); // shift removes the first element from the array
  if (command.charAt(0) === "$") {
    // extracts the command part ie, from $gif, it extracts gif
    console.log(command);
    command = command.substring(1);
    try {
      commands[command](tokens, res);
    } catch (e) {
      const embedMessage = new Discord.MessageEmbed()
        .setColor("#FF3B0C")
        .setTitle("Incorrect syntax dumbass!");
      res.channel.send(embedMessage);
      console.log(e);
    }
  }
};
