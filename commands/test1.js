client.on("message", msg => {
  const embed9 = new Discord.MessageEmbed()
  .setDescription(`o meu prefix é ${config.prefix}`)
  .setColor('RANDOM')

 msg.channel.send(embed9)
})