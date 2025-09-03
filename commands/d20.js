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
        "https://media.discordapp.net/attachments/1325193724266942624/1327375392717144216/ae18c47dc81c384bebed446069df9b07.png?ex=68b8a6ab&is=68b7552b&hm=59b40f05cf451f09d00901ba9ff3248e04ba00d41cb24454e9cf29c901a55d07&=&format=webp&quality=lossless&width=920&height=920"
      )
      .setFooter({
        text: interaction.client.user.username,
        iconURL: interaction.client.user.displayAvatarURL(),
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
