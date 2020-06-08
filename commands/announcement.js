const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

 

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Hey! Sorry, but you don't have permissions for that.");

  
    var splitser = "//";

   
    if (args[0] == null) {

        var useMessage = new discord.MessageEmbed()
            .setTitle("Announcement")
            .setColor("#ba3030")
            .setDescription(`Gebruik het volgende commando: !mededeling Naam van mededeling // Bericht`);

        return message.channel.send(useMessage);

    }

 
    args = args.join(" ").split(splitser);

   
    if (args[2] == undefined) args[2] = "#00FF00";
    if (args[3] == undefined) args[3] = "general";

 
    var options = {

        titel: args[0] || "Mededeling",
        bericht: args[1] || "- **StaffTeam VexNetwork.**",
        kleur: args[2].trim(),
        kanaal: args[3].trim()

    }

   
    var announcer = message.author;

    
    var announcementMessage = new discord.MessageEmbed()
        .setTitle("Mededeling:")
        .setColor("#ba3030")
        .setDescription(`\n\n ${options.titel} \n\n ${options.bericht} \n`)
        .setTimestamp();


    var announceChannel = message.guild.channels.cache.find(guild => guild.id === '719263436688719964');
    if (!announceChannel) return message.channel.send("Can't find the channel.");

   
    announceChannel.send(announcementMessage);

}

module.exports.help = {
    name: "mededeling"
}