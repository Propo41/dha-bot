// modules required: node-fetch, cheerio
// https://zetcode.com/javascript/cheerio/
const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const FILE_LOCATION = "./raw/news.txt";

var options = {
  method: "GET",
  url: "https://www.aust.edu/notice",
};

module.exports = function () {
  return new Promise(function (resolve, reject) {
    request(options, (err, res, body) => {
      if (err) return reject(err);
      let $ = cheerio.load(body);
      let notices = [];
      var str = [];
      var j = 1;
      var date = "";
      var title;
      var description;

      $(
        ".row > .col-3 > .notice_date > .month, .day, .year, .news_title_homepage, .news_excerpt"
      ).each(function (i, e) {
        str = $(this).text();
        if (j <= 3) {
          date += str + " ";
        } else if (j == 4) {
          title = str;
        } else {
          description = str.replace("Read More", "");
          notices.push({ date, title, description });
          date = "";
          j = 0;
        }
        j++;
      });

      $(".news_excerpt > a").each(function (i, e) {
        notices[i].link = $(this).attr("href");
      });

      var newsToShow = [];
      notices.forEach((element) => {
        var num = element.link.match(/\d/g);
        num = num.join("");
        if (!isAlreadyExist(num)) {
          newsToShow.push(element);
          appendToFile(`${num}\n`);
        }
      });

      if (newsToShow.length == 0) {
        console.log("No new news posted");
        resolve(null);
      } else {
        resolve(newsToShow);
      }
    });
  });
};

/* exports.fetchNews = function () {
  request(options, (err, res, body) => {
    if (err) return console.error(err);
    let $ = cheerio.load(body);
    let news = [];
    var prev = "";

    $(".news_date, .card-title").each(function (i, e) {
      if (i % 2 == 1) {
        // fetch the date, news, and link and push it
        var link = $(this).parent().parent().parent().parent().attr("href");
        // extract the number from the link and save it to the file
        var num = link.match(/\d/g);
        num = num.join("");
        if (!isAlreadyExist(num)) {
          news.push({ date: prev, news: $(this).text(), link: link });
          appendToFile(`${num}\n`);
        }
      } else {
        prev = $(this).text();
      }
    });
    if (news.length == 0) {
      console.log("No new news posted");
      return null;
    } else {
      return news;
    }
  });
}; */

/**
 *
 * @param {*} data the number extracted from the link
 * @returns true if the data already exists in the file, else false
 */
function isAlreadyExist(data) {
  file = fs.readFileSync(FILE_LOCATION);
  if (file.includes(data)) {
    return true;
  } else {
    return false;
  }
}

/**
 * appends the number to the file
 * @param {*} data the number extracted from the link
 */
function appendToFile(data) {
  fs.appendFile(FILE_LOCATION, data, function (err) {
    if (err) throw err;
    console.log("Saved!: " + data);
  });
}
