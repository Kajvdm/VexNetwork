
    const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
 
    let user = message.author;
    let userid = user.id;
    let name = "ticket-" + user;

    if(message.guild.channels.cache.find(x => x.name === name)){
        let embed = new discord.MessageEmbed()
        .setTitle("Ticket")
        .setColor("#CB4335")
        .setDescription("Je hebt al een ticket gemaakt.")
        message.channel.send(embed);
    }else {
        message.guild.channels.create(name).then(chan => {
            chan.setParent("719271121546903586");
            chan.updateOverwrite(message.guild.roles.cache.find(x => x.name === "@everyone"),{
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false
            })
            chan.updateOverwrite(user, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true
            })

            setTimeout(function(){
                let embed = new discord.MessageEmbed()
                .setTitle('Ticket')
                .setColor("#CB4335")
                .setDescription("Er is een support kanaal aangemaakt voor je!")
                message.channel.send(embed);
            }, 1500)
        })
    }
    
}
module.exports.help = {
    name: "ticket",
    description: "Maak een ticket"
}
