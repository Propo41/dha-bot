/**
 * generates a GIF based on the given keyword
 */
const fetch = require("node-fetch");

module.exports = async function (keyword, msg) {
  console.log(keyword.join('+'));
  if (keyword == undefined) {
    var url = `https://g.tenor.com/v1/trending?key=${process.env.TENOR_API_KEY}&limit=10`;
  } else {
    var url = `https://g.tenor.com/v1/search?q=${keyword.join('+')}&key=${process.env.TENOR_API_KEY}&limit=10`;
  }
  let response = await fetch(url);
  let json = await response.json();
  if (json.results.length == 0) {
    msg.channel.send("Oops. Nothing found sucker");
  } else {
    var index = Math.floor((Math.random() * 10));
    msg.channel.send(json.results[index].url);
  }
  //msg.reply("zunayed sucks"); // can also be sent like this
};
