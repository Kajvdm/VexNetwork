const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry, but you do not have permission for that!");

if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Sorry, but you do not have permission for that!");

if (!args[0]) return message.reply("Please specify a user for this command.");

if (!args[1]) return message.reply("Please specify a reason.");

var kick = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

var reason = args.slice(2).join(" ");

if (!kick) return message.reply("User not found.");

var embedPrompt = new discord.MessageEmbed()
    .setColor("GREEN")
    .setTitle("React on this message in 30 seconds to verify your kick.")
    .setDescription(`Do you really want to kick ${kick}?`);

var embed = new discord.MessageEmbed()
    .setColor("GREEN")
    .setFooter(message.member.displayName)
    .setTimestamp()
    .setDescription(`**Kicked user:** ${kick}
    **Kicked by:** ${message.author}
    **Reason:** ${reason}`);


    message.channel.send(embedPrompt).then(async msg =>{

        var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"] );

        if(emoji === "✅"){

            msg.delete();

            kick.kick(reason).catch(err =>{
                if(err) return message.reply("Something went wrong!");
            });

            message.channel.send(embed);

        } else if(emoji === "❌"){

            msg.delete();

            return message.reply("Kick succesfully cancelled!").then(m => m.delete(5000));

        }

    })
}

    module.exports.help = {
        name: "kick"
    }

    async function promptMessage(message, author, time, reactions){
mode 
        time *=1000;
    
        for(const reaction of reactions){
            await message.react(reaction);
        }
    
        var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;
        
        return message.awaitReactions(filter, {max:1, time: time}).then(collected => collected.first() && collected.first().emoji.name);
    
    }