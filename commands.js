const { REST, Routes, Options } = require("discord.js");
const config = require("./config.json");

const token = config.token;
const clientId = config.clientId;

const commands = [
  {
    name: "d20",
    description: "Gira um valor no dado.",
    options: [
      {
        name: "modificador",
        description: "Adicionar um modificador ao dado.",
        type: 4,
        required: false,
      },
    ],
  },
  {
    name: "pergunta",
    description: "Faz uma pergunta.",
    options: [
      {
        name: "pergunta",
        description: "Converse com o bot.",
        type: 3,
        required: true
      }
    ]
  },
];

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("Atualizando os comandos (/) da aplicação.");

    await rest.put(Routes.applicationCommands(clientId), { body: commands });

    console.log("Os comandos da aplicação (/) foram atualizados com sucesso.");
  } catch (error) {
    console.error(error);
  }
})();
