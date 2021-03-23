const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

exports.run = async (bot, message, args) => {
  
    let autor = message.author;
    
    let user = message.mentions.users.first();
    
    if(!user) {
        return message.channel.send(` ${autor} você tem que mencionar um membro para realizar seu roubo!`);
    };

    if(user.id == autor.id){
        return message.channel.send(` ${autor} você não pode se auto-roubar!`);
    };

    let user_money = await db.fetch(`money_${message.guild.id}_${user.id}`)
    if(user_money == null) user_money = 0;

    let autor_money = await db.fetch(`money_${message.guild.id}_${autor.id}`)
    if(autor_money == null) autor_money = 0;
        
    if(user_money <= 0) {
        return message.channel.send(` ${autor}, você não pode roubar alguem que não possui dinheiro!`);
    };

    let timeout = 600000;

    let daily = await db.fetch(`rob_${message.guild.id}_${autor.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {

        let time = ms(timeout - (Date.now() - daily));
  
        let timeEmbed = new Discord.MessageEmbed()
        .setColor("#000001")
        .setDescription(` Você já realizou um roubo hoje!\n\nTente novamente daqui a **${time.hours}h ${time.minutes}m ${time.seconds}s**`);
        
        message.channel.send(`${autor}`, timeEmbed);
    } else {
        
        let sorte = Math.floor(Math.random() * 4) + 1;
        
        if(sorte == 2) {
            
            let amount = Math.floor(Math.random() * autor_money) + 1;
            
            let moneyEmbed = new Discord.MessageEmbed()
            .setTitle("👮 Seu roubo falhou e você foi preso!")
            .setColor("#000001")
