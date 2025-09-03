const { SlashCommandBuilder } = required("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responds with a "pong!"'),

    async execute(e) {
        await e.reply("Pong!")
    }
}