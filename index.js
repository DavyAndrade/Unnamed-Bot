const config = require("./config.json");
const {
  Client,
  Events,
  GatewayIntentBits,
  EmbedBuilder,
} = require("discord.js");

const token = config.token;
const genAI = config.gemini_api_key;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, (readyClient) => {
  console.log(`${readyClient.user.tag} foi logado!`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  // Comando D20
  if (interaction.commandName === "d20") {
    const modificador = interaction.options.getInteger("modificador") || 0;

    const roll = Math.floor(Math.random() * 20) + 1;
    const result = roll + (modificador ? modificador : 0);

    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`Resultado do D20`)
      .addFields(
        { name: "Rolagem do dado:", value: roll.toString(), inline: false },
        { name: "Modificador:", value: modificador.toString(), inline: false },
        { name: "Resultado Final:", value: result.toString(), inline: false }
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/1325193724266942624/1327375392717144216/ae18c47dc81c384bebed446069df9b07.png?ex=6782d62b&is=678184ab&hm=d7eeff354fdf34b7319b396f6c7c36eb7243c9d32029800d7491bfc37b5d7c74&"
      )
      .setFooter({
        text: interaction.client.user.username,
        iconURL: interaction.client.user.displayAvatarURL(),
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
});

client.login(token);
/* Se liga, vou fazer aqui a parada do Gemini
 
 const { GoogleGenerativeAI } = require("@google")

     const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const parts = [
      {
        text: `input: ${userMessage}`,
      },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });

    const reply = await result.response.text();
    // due to Discord limitations, we can only send 2000 characters at a time, so we need to split the message
    if (reply.length > 2000) {
      const replyArray = reply.match(/[\s\S]{1,2000}/g);
      replyArray.forEach(async (msg) => {
        await message.reply(msg);
      });
      return;
    }

    message.reply(reply);
  }
});

 
 */
