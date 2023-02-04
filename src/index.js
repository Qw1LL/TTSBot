const Discord = require("discord.js");
const config = require("../config.json");

console.log(1);
const client = new Discord.Client({intents: ["128"]});

client.login(config.BOT_TOKEN).then(result => console.log(result)).catch(e => console.log(e));





