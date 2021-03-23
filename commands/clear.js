const Discord = require('discord.js');

exports.run = async (client, message, args) => {
	if (!message.member.permissions.has('MANAGE_MESSAGES')) {
		return message.reply(
			'lhe falta permissão de `Gerenciar Mensagens` para usar esse comando'
		);
	}
	const deleteCount = parseInt(args[0], 10);

	if (!deleteCount || deleteCount < 1 || deleteCount > 99) {
		let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

		let embedi = new Discord.MessageEmbed()
			.setDescription(`${user.username} por favor forneça a quantidade de mensagens a serem apagadas`)
			.setColor(`#8A2BE2`)

		message.channel.send(embedi);
	}

	let embed = new Discord.MessageEmbed()
		.setDescription(`${args[0]} mensagens limpas nesse chat!`)
		.setColor(`#8A2BE2`);

	const fetched = await message.channel.messages.fetch({
		limit: deleteCount + 1
	});
	message.channel.bulkDelete(fetched);
	message.channel
		.send(embed)
		.then(msg => msg.delete({ timeout: 5000 }))
		.catch(error =>
			console.log(`Não foi possível deletar mensagens devido a: ${error}`)
		);
};

exports.help = {
  name: "clear",
  aliases: "limpar",
  description: "limpa as mensagens do chat",
  usage: "<prefixo>clear <quantidade>"
}