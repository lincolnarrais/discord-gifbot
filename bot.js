require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client();
const fetch = require('node-fetch');

client.on('ready', () => {
  console.log(`${client.user.tag} está pronto e rodando!`);
});

client.on('message', async (msg) => {
  try {
    let userName = msg.member.user.username;
    let content = msg.content;
    let timestamp = msg.createdAt;
    let hour = timestamp.getHours();
    let minute = timestamp.getMinutes();
    let second = timestamp.getSeconds();
    let time = `${hour}:${minute}:${second}`;
    console.log(`${userName} [${time}]: ${content}`);
    let query = msg.content.split(' ');
    if (query[0].startsWith('.')) {
      switch (query[0]) {
        case '.gif':
          let url = `https://g.tenor.com/v1/search?q=${query[1]}&key=${process.env.TENOR_TOKEN}`;
          let response = await fetch(url);
          let data = await response.json();
          let random = Math.floor(Math.random() * data.results.length);
          msg.channel.send(data.results[random].url);
          break;
        case '.comandos':
          msg.channel.send(
            '`.comandos`\n' +
            '`.gif <argumento>`'
          );
          break;
        default:
          msg.channel.send('Comando inválido. Digite `.comandos` para ver a lista de comandos.');
        break;
      }
    }
  } catch (error) {
    console.log(error);
  }
});

try {
  client.login(process.env.BOT_TOKEN);
} catch (error) {
  console.log('Houve um erro relacionado ao TOKEN.');
}