const cheerio = require("cheerio");
const request = require("request");
const Discord = require("discord.js");

var options = {
  method: "GET",
  url: "https://www.aust.edu/news",
};

module.exports = function (entriesToShow, dResponse) {
  if (isNaN(entriesToShow)) {
    embedError(
      "I sometimes wonder if you are actually a CSE student... 😞",
      dResponse
    );
    return;
  }
  request(options, (err, res, body) => {
    if (err) return reject(err);

    let $ = cheerio.load(body);
    let news = [];
    var prev = "";

    $(".news_date, .card-title").each(function (i, e) {
      if (i % 2 == 1) {
        // fetch the date, news, and link and push it
        var link = $(this).parent().parent().parent().parent().attr("href");
        news.push({ date: prev, news: $(this).text(), link: link });
      } else {
        prev = $(this).text();
      }
    });
    if (news.length == 0) {
      console.log("something went wrong.");
    } else {
      embedNews(news, dResponse, entriesToShow);
    }
  });
};

function embedNews(news, res, entriesToShow) {
  if (entriesToShow.length == 0) {
    entriesToShow = 5;
  }
  var embedMessage = new Discord.MessageEmbed()
    .setColor("#2B9920")
    .setTitle("AUST Latest News")
    .setDescription(
      `Showing the top ${entriesToShow} posts from the aust website:
  ------------------------------------------------------------`
    )
    .setThumbnail("https://imgur.com/cu4zALa.png");
  var i = 1;
  news.forEach((element) => {
    if (i <= entriesToShow) {
      embedMessage.addField(element.date, `${element.news}\n${element.link}`);
    }
    i++;
  });
  res.channel.send(embedMessage);
}

function embedError(msg, res) {
  const embedMessage = new Discord.MessageEmbed()
    .setColor("#FF3B0C")
    .setTitle(msg);
  res.channel.send(embedMessage);
}
