const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const config = require("./config.json");

const token = config.token;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        console.log(`Aí sim! O comando ${command.data.name} foi carregado.`);
    } else {
        console.log(`Vacilou! O comando em ${filePath} está com a estrutura incorreta.`);
    }
}

client.once(Events.ClientReady, readyClient => {
  console.log(`Tamo rodando família! ${readyClient.user.tag} está rodando mais que pião!`);
})

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`Então, cria... O comando ${interaction.commandName} não foi encontrado...`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'Fala truta, vou falar aqui e morre entre nós... Não deu pra executar esse comando não pae. Faz o L', ephemeral: true});
    } else {
      await interaction.reply({ content: 'Fala truta, vou falar aqui e morre entre nós... Não deu pra executar esse comando não pae. Faz o L', ephemeral: true});

    }
    }
  });

client.login(token);