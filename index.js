const { Client, GatewayIntentBits } = require('discord.js');
const config = require("./config.json");


const client = new Client({ intents: [GatewayIntentBits.MessageContent] });

client.login(config.BOT_TOKEN).then(result => console.log(result)).catch(e => console.log(e));