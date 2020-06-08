const discord = require("discord.js");

module.exports.run = async(bot, message, args) =>{

    var serverEmbed = new discord.MessageEmbed()
            .setDescription("**VexNetwork Server Informatie**")
            .setImage("https://cdn.discordapp.com/attachments/719256890466631752/719261075752878200/Untitled-1.jpg")
            .setColor("#CB4335 ")
//            .addField("Sended by", client.user.username)
            .addField("Server IP:", "VexNetwork.serv.nu")
            .addField("Server Version:", "1.12.2")
            .addField("Server Status:", "✅Online✅")
            .addField("Server Store:", "In aanbouw")
            .setTimestamp()
            .setFooter(`Aangevraagd door: ${message.author}`);
        
 
        return message.channel.send(serverEmbed);

}

module.exports.help = {
    name: "ip"
}