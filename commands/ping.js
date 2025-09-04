const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responde com "Pong!" para testar o bot.'),

    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};