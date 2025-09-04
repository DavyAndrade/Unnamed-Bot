const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("d20")
    .setDescription("Rola um dado D20 com modificador opcional")
    .addIntegerOption((option) =>
      option
        .setName("modificador")
        .setDescription("Modificador a ser adicionado ao resultado")
        .setRequired(false)
    ),
  async execute(interaction) {
    const modificador = interaction.options.getInteger("modificador") || 0;
    const roll = Math.floor(Math.random() * 20) + 1;
    const result = roll + modificador;

    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`🎲 Resultado do D20`)
      .addFields(
        { name: "Rolagem do dado:", value: roll.toString() },
        { name: "Modificador:", value: modificador.toString() },
        { name: "Resultado Final:", value: `**${result.toString()}**` }
      )
      .setThumbnail(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9nAiilf0Q-fX0sWUiQzLSR5hSvPetptqznA_LnFQDQZUR1zHALA74G9FzDTc0kh9rc24&usqp=CAU"
      )
      .setFooter({
        text: interaction.client.user.username,
        iconURL: interaction.client.user.displayAvatarURL(),
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
