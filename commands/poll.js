const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
 
    var idee = args.join(" ");

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Hey! Sorry, but you don't have permissions for that.");
 
    if (!idee) return message.channel.send("Specificeer een poll.");
 
    var ideeEmbed = new discord.MessageEmbed()
        .setTitle("Nieuwe Poll")
        .setColor("#CB4335")
        .addField("Poll: ", idee)
        .addField("Verstuurd door: ", message.author);

    var ideeChannel = message.guild.channels.cache.find(guild => guild.id === '719272803140108320');
    if (!ideeChannel) return message.guild.send("Kan het kanaal niet vinden.");
 
    ideeChannel.send(ideeEmbed).then(embedMessage => {
        embedMessage.react('👍');
        embedMessage.react('👎');
    });
 
}
 
module.exports.help = {
    name: "poll",
    description: "Polls"
}