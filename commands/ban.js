const discord = require("discord.js");

module.exports.run = async(bot, message, args) =>{

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Sorry, but you do not have permission for that!");

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("Sorry, but you do not have permission for that!");
    
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Somebody tried to ban, but failed.");

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) console.log("Somebody tried to ban, but failed.");

    if (!args[0]) return message.reply("Please specify a user for this command.");

    if (!args[1]) return message.reply("Please specify a reason.");

    var ban = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

    var reason = args.slice(1).join(" ");

    if (!ban) return message.reply("User not found.");

    var embedPrompt = new discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("React on this message in 30 seconds to verify your ban.")
        .setDescription(`Do you really want to ban ${ban}?`);

    var embed = new discord.MessageEmbed()
        .setColor("GREEN")
        .setFooter(message.member.displayName)
        .setTimestamp()
        .setDescription(`**Banned user:** ${ban}
        **Banned by:** ${message.author}
        **Reason:** ${reason}`);

    
        message.channel.send(embedPrompt).then(async msg =>{

            var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"] );

            if(emoji === "✅"){

                msg.delete();

                ban.ban(reason).catch(err =>{
                    if(err) return message.reply("Something went wrong!");
                });

                message.channel.send(embed);

            } else if(emoji === "❌"){

                msg.delete();

                return message.reply("Ban succesfully cancelled!").then(m => m.delete(5000));

            }

        })



}

module.exports.help = {
    name: "ban"
}

async function promptMessage(message, author, time, reactions){

    time *=1000;

    for(const reaction of reactions){
        await message.react(reaction);
    }

    var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;
    
    return message.awaitReactions(filter, {max:1, time: time}).then(collected => collected.first() && collected.first().emoji.name);

}
