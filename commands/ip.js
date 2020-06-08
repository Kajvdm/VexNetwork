const discord = require("discord.js");

module.exports.run = async(bot, message, args) =>{

    var serverEmbed = new discord.MessageEmbed()
            .setDescription("**VexNetwork Server Informatie**")
            .setImage("https://cdn.discordapp.com/attachments/710935133598908416/712956554801971210/logo.png")
            .setColor("#CB4335 ")
//            .addField("Sended by", client.user.username)
            .addField("Server IP:", "VexNetwork.serv.nu")
            .addField("Server version:", "1.12.2")
            .addField("Server status:", "✅Online✅")
            .addField("Server store:", "In aanbouw")
            .setTimestamp()
            .setFooter(`Aangevraagd door: ${message.author}`);
        
 
        return message.channel.send(serverEmbed);

}

module.exports.help = {
    name: "ip"
}