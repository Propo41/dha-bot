const { google } = require("googleapis");
const Discord = require("discord.js");

/*
 * gets the top #numEntries from the google sheets,
 * ie, if numEntries = 5, then it retrieves the top 5 rows from the sheet
 */
module.exports = async function (numEntries, dResponse) {
  if (numEntries == undefined) {
    numEntries = 10;
  }
  // JWT = json web token
  const client = new google.auth.JWT(
    process.env.G_CLIENT_EMAIL,
    null,
    process.env.G_PRIVATE_KEY,
    ["https://www.googleapis.com/auth/spreadsheets"]
  );

  const gsapi = google.sheets({
    version: "v4",
    auth: client,
  });
  // "Data! is the name of the sheet tab. If not provided, then the default is chosen"
  const options = {
    spreadsheetId: "1b58VKB1D80B3CenNfaQvYHE3-eRj78Ej-XlxeeadIpw",
    range: `Data!A2:D${numEntries}`,
  };

  let data = await gsapi.spreadsheets.values.get(options);

  var embedMessage = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("List").setDescription(`Showing top ${numEntries} entries:
    ------------------------------------------------------------`);
  data.data.values.forEach((element) => {
    embedMessage.addField("Title", element[0], true);
    embedMessage.addField("Content", element[1], true);
    if (element[2] != undefined) {
      embedMessage.addField("Description", element[2], true);
    }
    if (element[3] != undefined) {
      embedMessage.addField("Link", element[3], true);
    }
    embedMessage.addField("\u200B", "\u200B");
  });
  dResponse.channel.send(embedMessage);
};
