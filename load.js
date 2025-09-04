const { REST, Routes } = require("discord.js");
const config = require("./config.json");
const fs = require("node:fs");
const path = require("node:path");

const token = config.token;
const clientId = config.clientId;

const commands = [];
// Cria o caminho absoluto para a pasta 'commands'
const commandsPath = path.join(__dirname, 'commands');
// Lê apenas os arquivos que terminam com .js
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

console.log("Carregando arquivos de comando...");

for (const file of commandFiles) {
    // Cria o caminho absoluto para cada arquivo de comando
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
        console.log(`Aí sim! Comando ${command.data.name} encontrado em ${file}`);
    } else {
        console.log(`Vacilou! O arquivo ${file} não tem a estrutura de comando correta.`);
    }
}

const rest = new REST({ version: "10" }).setToken(token);

// Função auto-executável para registrar os comandos
(async () => {
    try {
        console.log(`\nAtualizando ${commands.length} comandos (/) da aplicação.`);

        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands }
        );

        console.log(`${data.length} comandos (/).`);
    } catch (error) {
        console.error(error);
    }
})();