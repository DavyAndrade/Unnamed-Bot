const { REST, Routes, Options } = require("discord.js");
const config = require("./config.json");
const token = config.token;
const clientId = config.clientId;

const fs = require("node:fs")
const path = require("node:path")

console.log("Tentando atualizar /commands...")

const cPath = path.join(__dirname, 'commands')
const cFiles = fs.readdirSync(cPath).filter(file => file.endsWith(".js"))

const commands = []

for (const file of cFiles) {
    const command = require(`./commands/${file}`)

    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON())
    } else {
        console.log(`O arquivo ${file} está com a estrutura de comando incorreta.`)
    }
}

const rest = new REST({version: "10"}).setToken(token);

(async () => {
    try {
        console.log(`Atualizando ${commands.length} /commands...`)

        const data = await rest.put(
            Routes.applicationCommands(clientId), {
                body: commands
            }
        )

        console.log(`Todos os ${commands.length} /commands foram atualizados com sucesso!`)
    } catch (e) {
        console.error(e)
    }
}) 