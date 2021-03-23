const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const firebase = require("firebase");
const server = require("./server.js");

var firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

client.on("message", message => {
  let channel = "816837607366983680";
  if (message.channel.type == "DM") return;
  if (message.author.bot) return;

  database
    .ref(`Servidores/Levels/${message.guild.id}/${message.author.id}`)
    .once("value")
    .then(async function(db) {
      if (db.val() == null) {
        database
          .ref(`Servidores/Levels/${message.guild.id}/${message.author.id}`)
          .set({
            xp: 0,
            level: 1,
            limite: 100
          });
      } else {
        let geraXP = Math.floor(Math.random() * 25) + 1;
        let geralimite = Math.floor(Math.random() * 650) + 250;
        
        if (db.val().limite <= db.val().xp) {
          database
            .ref(`Servidores/Levels/${message.guild.id}/${message.author.id}`)
            .update({
              xp: db.val().xp,
              level: db.val().level + 1,
              limite: db.val().limite + geralimite
            });
          message.channel.send(
            `parabens ${
              message.author
            }, você subiu de nivel o seu nivel atual é ${db.val().level+1}`
          );
        } else {
          database
            .ref(`Servidores/Levels/${message.guild.id}/${message.author.id}`)
            .update({
              xp: db.val().xp + geraXP
            });
        }
      }
});
  
client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
const embed9 = new Discord.MessageEmbed()
.setDescription(`não foi possivel achar o comando ${command} \n\n user ${prefix}help para conhecer os meus comandos`)
.setColor('8A2BE2')
    message.channel.send(embed9);
  }
})}
)
client.login(process.env.TOKEN);