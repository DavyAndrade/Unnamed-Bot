# 🤖 Unnamed Bot

Unnamed Bot é um bot para Discord desenvolvido em Node.js, focado em utilidades para servidores, especialmente para jogos de RPG e interações rápidas. Ele utiliza a biblioteca `discord.js` e integra comandos slash modernos.

## ✨ Funcionalidades Principais

- **Rolagem de Dados D20**  
  Comando `/d20` para rolar um dado de 20 lados, com opção de adicionar modificador. O resultado é exibido em um embed estilizado, mostrando a rolagem, modificador e resultado final.

- **Ping**  
  Comando `/ping` responde com "Pong!", útil para testar se o bot está online e responsivo.

## 🛠️ Comandos Disponíveis

| Comando     | Descrição                | Opções              |
| ----------- | ------------------------ | ------------------- |
| `/d20`      | Rola um dado de 20 lados | `modificador` (int) |
| `/ping`     | Responde com "Pong!"     | -                   |

## 📦 Dependências

- [`discord.js`](https://discord.js.org/) - Interação com a API do Discord.

## 🚀 Como funciona

- O bot inicializa e registra comandos slash (`/d20`, `/pergunta`, `/ping`).
- Ao receber `/d20`, rola um dado, aplica modificador e responde com um embed visual.
- `/ping` responde com "Pong!".

## 🖼️ Visual

O comando `/d20` utiliza um thumbnail personalizado para dar mais estilo à resposta.

## 📁 Estrutura do Projeto

```
Unnamed/
├── index.js           # Inicialização do bot e eventos
├── commands.js        # Registro dos comandos slash
├── commands/
│   └── ping.js        # Implementação do comando ping
├── config.json        # Configurações e credenciais
├── package.json       # Dependências do projeto
├── assets/
│   └── niko.png       # Imagem utilizada nos embeds
└── README.md          # Documentação do projeto
```

## 💡 Expansão

O projeto já está preparado para integração com IA generativa, podendo responder perguntas de forma inteligente. Basta implementar a lógica usando a dependência já instalada.

---

Se quiser adicionar mais comandos ou integrar IA, basta expandir os arquivos existentes! Se precisar de instruções para rodar ou instalar, só pedir.
