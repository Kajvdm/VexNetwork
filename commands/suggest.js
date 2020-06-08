const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
 
    var idee = args.join(" ");
 
    if (!idee) return message.channel.send("Specificeer een suggestie.");
 
    var ideeEmbed = new discord.MessageEmbed()
        .setTitle("Nieuwe Suggestie")
        .setColor("#CB4335")
        .addField("Suggestie: ", idee)
        .addField("Verstuurd door: ", message.author);

    var ideeChannel = message.guild.channels.cache.find(guild => guild.id === '719269549169442949');
    if (!ideeChannel) return message.guild.send("Kan het kanaal niet vinden.");
 
    ideeChannel.send(ideeEmbed).then(embedMessage => {
        embedMessage.react('👍');
        embedMessage.react('👎');
    });
 
}
 
module.exports.help = {
    name: "suggest",
    description: "Enige suggesties? Laat ze achter!"
}