const discord = require("discord.js");

module.exports.run = async(bot, message, args) =>{

    return message.channel.send('Pong! Your ping is `' + `${Date.now() - message.createdTimestamp}` + ' ms`');

}

module.exports.help = {
    name: "ping"
}