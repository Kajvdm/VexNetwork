const discord = require("discord.js");

module.exports.run = async(bot, message, args) =>{

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Hey! Sorry, but you don't have permissions for that.");
 
    if (!args[0]) return message.reply("Specify the amount of messages you need to delete.");
  
    if (Number.isInteger(parseInt(args[0]))) {
  
        var aantal = parseInt(args[0]) + 1;
  
        message.channel.bulkDelete(aantal).then(() => {
  
            if (args[0] == 0) {
  
                message.reply(`I can't delete 0 messages?`).then(msg => msg.delete({timeout: 3000}));
           
            } else if (args[0] == 1) {
           
                message.reply(`I deleted 1 message for you.`).then(msg => msg.delete({timeout: 3000}));
           
            } else {
           
                message.reply(`I deleted ${args[0]} messages.`).then(msg => msg.delete({timeout: 3000}));
           
            }
  
        });
  
    } else {
        return message.reply("Give up a number.");
    }
  

}

module.exports.help = {
    name: "clear"
}