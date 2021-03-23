const { MessageEmbed } = require("discord.js");
const client = require('discord.js');

exports.run = async function (client, message, args) {
    
    var permissions = 37080128;
    
    let invite = new MessageEmbed()
    .setTitle(`Invite ${client.user.username}`)
    .setDescription(`Want me in your server? Invite me today! \n\n [Invite Link](https://discord.com/oauth2/authorize?client_id=821112198549995531&scope=bot&permissions=8)`)
    .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=${permissions}&scope=bot`)
    .setColor("BLUE")
    return message.channel.send(invite);
}
