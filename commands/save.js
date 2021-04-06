// https://youtu.be/MiPpQzW_ya0
// https://developers.google.com/sheets/api/quickstart/nodejs
// https://developers.google.com/sheets/api/guides/create
// scopes: https://developers.google.com/identity/protocols/oauth2/scopes
// https://developers.google.com/sheets/api/reference/rest?apix=true
// npm install googleapis@39 --save

const { google } = require("googleapis");
const Discord = require("discord.js");


/**
 * updates data in the google sheets.
 */
module.exports = async function (content, dResponse) {
  if (content.length < 2) {
    dResponse.reply("You must provide necessary parameters!");
    return;
  } else if (content.length == 3) {
    content.push("");
  } else if (content.length == 2) {
    content.push("");
    content.push("");
  }
  console.log(content);
  // JWT = json web token
  const client = new google.auth.JWT(
    process.env.G_CLIENT_EMAIL,
    null,
    process.env.G_PRIVATE_KEY,
    ["https://www.googleapis.com/auth/spreadsheets"]
  );

  // creating a connection to google api
  // if success, then start gsrun()
  var tokens = await client.authorize();
  console.log("connected");
  //console.log(tokens);
  const gsapi = google.sheets({
    version: "v4",
    auth: client,
  });

  let data = [
    [
      content[0].trim(),
      content[1].trim(),
      content[2].trim(),
      content[3].trim(),
    ],
  ];

  const options = {
    spreadsheetId: "1b58VKB1D80B3CenNfaQvYHE3-eRj78Ej-XlxeeadIpw",
    range: "Data!A2",
    valueInputOption: "USER_ENTERED",
    resource: { values: data },
  };

  let res = await gsapi.spreadsheets.values.append(options);

  var embedMessage = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Updated successfully");
  dResponse.channel.send(embedMessage);
};
