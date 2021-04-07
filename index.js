const Discord = require("discord.js");
const News = require("./commands/news_event.js");
require("dotenv").config();
const client = new Discord.Client();
const commandHandler = require("./commands");
const ANNOUNCEMENTS_CHANNEL_ID = "789966208514129972";
const NEWS_FETCH_DELAY = 3*60*60*1000; // 3 HOURS

// triggered when bot is online
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  runNewsFetcher();
});

/**
 * A timer function that is called every X hours.
 * It scrapes the website and fetches any new post
 */
function runNewsFetcher() {
  News()
    .then((news) => {
      if (news != null) {
        embedNews(news);
      } else {
        console.log("nothing new added.");
      }
    })
    .catch((e) => {
      console.log("error getting request");
    });

  /**
   * set timeout doesn't cause memory leaks as it
   * waits before the previous execution is finished
   * calls the function fetchNews() every 5s
   */
  setTimeout(runNewsFetcher, NEWS_FETCH_DELAY);
}
// triggered when bot receives a message
client.on("message", commandHandler);

// this is the bot token found in discord console
client.login(process.env.BOT_TOKEN);

function embedNews(news) {
  var embedMessage = new Discord.MessageEmbed()
    .setColor("#2B9920")
    .setTitle("AUST Latest News")
    .setDescription(
      `Showing the latest news from the aust website:
------------------------------------------------------------`
    )
    .setThumbnail("https://imgur.com/cu4zALa.png");
  news.forEach((element) => {
    embedMessage.addField(element.date, `${element.news}\n${element.link}`);
  });
  client.channels.cache.get(ANNOUNCEMENTS_CHANNEL_ID).send(embedMessage);
}
