const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {


    var prefix = botConfig.prefix;

    if (!args[0]) return message.channel.send(`Gebruik de command zo: ${prefix}report username reason.`)

    var user = message.guild.member(message.mentions.users.first());

    if (!user) return message.channel.send("Ik kan de gebruiker niet vinden of er is geen gebruiker opgegeven.");

    var reason = args.join(" ").slice(22);

    if (!reason) return message.channel.send("Specificeer een reden.")

    var reportEmbed = new discord.MessageEmbed()
        .setDescription("Report")
        .setColor("ff0000")
        .addField("Reported user", `${user} met het userid ${user.id}`)
        .addField("Reported by", `${message.author} met het userid ${message.author.id}`)
        .addField("Reden", reason)
        .setFooter(message.createdAt);

    var channelReport = message.guild.channels.cache.find(guild => guild.name === '🔒staff-log');
    if (!channelReport) return message.channel.send("Kan het kanaal niet vinden.");

    message.delete();

    return channelReport.send(reportEmbed);

}

module.exports.help = {
    name: "report"
}