const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    if(!message.channel.name.startsWith("ticket-")) return message.channel.send("You already created a ticket!")
       else{
           message.channel.delete()
       } 
}

module.exports.help = {
    name: "close"
}