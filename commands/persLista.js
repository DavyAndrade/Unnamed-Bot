const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const cardsData = require('../cards.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("colecao")
        .setDescription("Lista de todos os personagens"),
        
    async execute(interaction) {
        const groupedByClass = cardsData.reduce((acc, personagem) => {
            const {classe} = personagem;
            if (!acc[classe]) {
                acc[classe] = [];
            }
            acc[classe].push(personagem);
            return acc;
        }, {});


    const listEmbed = new EmbedBuilder()
        .setColor(0x000001)
        .setTitle("Coleção de Todos os personagens")
        .setDescription("Olá, caro jogador! Aqui você encontra todas os personagens em duas respectivas classes e IDs de localização. Para ver mais detalhes sobre um personagem específico, utilize o  comando /personagens seguido do ID correspondente.")
        for (const classe in groupedByClass) {
            const personagensDaClasse = groupedByClass[classe];
            const fieldValue = personagensDaClasse
                .map(p => `**ID:** ${p.id} - **Nome:** ${p.name}`)
                .join("\n");
            listEmbed.addFields({ name: `---${classe}---`, value: fieldValue, inline: false })      
        }

        await interaction.reply({ embeds: [listEmbed] });
    },
};



   