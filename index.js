const config = require("./config.json");
const {
  Client,
  Events,
  GatewayIntentBits,
  EmbedBuilder,
} = require("discord.js");

const token = config.token;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent, 
  ],
});

client.on(Events.ClientReady, (readyClient) => {
  console.log(`${readyClient.user.tag} foi logado!`);
});

client.login(token);