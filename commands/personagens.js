const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const cardsData = require('../cards.json');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("personagens")
        .setDescription("Lista de Cartas")
        .addIntegerOption(option =>
            option.setName("id")
                .setDescription("ID da carta")
                .setRequired(true)),
    
    async execute(interaction) {
        const id = interaction.options.getInteger("id");
        const filePath = path.join(__dirname, "..", "cards.json");
        const personagens = cardsData.find(card => card.id === id);
        if (!personagens) {
            await interaction.reply({ content: `Personagem ${id} não existe na nossa coleção.`});
            return;
        }

        const embed = new EmbedBuilder()
            .setColor(personagens.rarityColor)
            .setTitle(`**${personagens.name}**`)
            .setThumbnail(personagens.raridadePic)
            .addFields(
                { name: "Classe", value: personagens.classe.toString(), inline: true },
                { name: "Ataque", value: personagens.atk.toString(), inline: true },
                { name: "Defesa", value: personagens.def.toString(), inline: true },
                { name: "Descrição", value: personagens.descricao },
                { name: "Habilidade", value: personagens.habilidade }
            )
            .setImage(personagens.cardPic)
            .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() })


    await interaction.reply({ embeds: [embed] });
   }
}