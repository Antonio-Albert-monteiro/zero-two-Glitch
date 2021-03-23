const Discord = require("discord.js");

module.exports.run = async (bot, message, MessageEmbed) => {
  let botMsg = await message.channel.send("〽️ Pining");
  const timeTaken = Date.now() - message.createdTimestamp;

  const embed = new Discord.MessageEmbed()
    .addField("Latência do server: ", `${timeTaken}ms!`)
    .addField("zero-two: ",`${Math.round(botMsg.createdAt - message.createdAt)}ms!`)
    .addField("Latência da API:", `${Math.round(bot.ws.ping)}ms!`)
    .setColor("8A2BE2");
  botMsg.edit(" ", embed);
};

exports.help = {
  name: "say",
  aliases: "repetir",
  description: "repeti tudo que vc fala",
  usage: "<prefixo>ping"
}