const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const client = new discord.Client();
client.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    client.commands.set(props.help.name, props);
  });
});
client.login(process.env.token);

client.on("ready", async () => {

    console.log(`${client.user.username} is online`);
    client.user.setActivity('VexNetwork.serv.nu');

});

client.on('guildMemberAdd', member => {
   member.roles.add('719266358440755220')
    const channel = member.guild.channels.cache.find(c => c.name == "👋welkom-doei")
    if(!channel) return console.log('channel bestaat niet')

    channel.send(`Welkom ${member}! Lees de regels en veel speelplezier!👋`)
})

client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.cache.find(c => c.name == "👋welkom-doei")
    if(!channel) return console.log('channel bestaat niet')

    channel.send(`Doeg ${member}. Het was gezellig!👋`)
})

client.on("message", async message =>{

    if(message.author.bot) return;
  if(message.channel.type === "dm") return;


      let prefix = '!';

  if (!message.content.startsWith(prefix)) return;
  
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(client,message,args);

  // if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Hey! Sorry, but you don't have permissions for that.");
 
  // if (!args[0]) return message.reply("Specify the amount of messages you need to delete.");

  // if (Number.isInteger(parseInt(args[0]))) {

  //     var aantal = parseInt(args[0]) + 1;

  //     message.channel.bulkDelete(aantal).then(() => {

  //         if (args[0] == 0) {

  //             message.reply(`I can't delete 0 messages?`).then(msg => msg.delete({timeout: 3000}));
         
  //         } else if (args[0] == 1) {
         
  //             message.reply(`I deleted 1 message for you.`).then(msg => msg.delete({timeout: 3000}));
         
  //         } else {
         
  //             message.reply(`I deleted ${args[0]} messages.`).then(msg => msg.delete({timeout: 3000}));
         
  //         }

  //     });

  // } else {
  //     return message.reply("Give up a number.");
  // }


    // if(cmd === `${prefix}Ping`){
    //     return message.channel.send("Pong!");
    // }

    // if (cmd === `${prefix}serverinfo`) {
 
    //     // var serverEmbed = new discord.MessageEmbed()
    //     //     .setDescription("**Discord Information**")
    //     //     .setImage("https://cmgcreate-1.imgix.net/db72e3e3-de51-4836-b7f1-013b6c67c674hot-paint-thanks-for-joining-us.jpg?q=60&w=720&s=1b47fa8ce585b75d32c211291e817a1e")
    //     //     .setColor("DARKBLUE")
    //     //     .addField("Sended by", client.user.username)
    //     //     .addField("Joined at", message.member.joinedAt)
    //     //     .addField("Total Members", message.guild.memberCount)
    //     //     .setTimestamp()
    //     //     .setFooter(`Requested by: ${message.author}`);
 
    //     // return message.channel.send(serverEmbed);
    // }

    // if (cmd === `${prefix}serverstatus`) {
 
    //     var serverEmbed = new discord.MessageEmbed()
    //         .setDescription("**GoldenCasino Server Information**")
    //         .setImage("https://lh3.googleusercontent.com/Kz5RaprZLdpxccVhbShp7qPy5z-eB2rn1Cxd3ey4OBX2WyFHvBvDI0ryRFWw5J423wk")
    //         .setColor("GOLD")
    //         .addField("Sended by", client.user.username)
    //         .addField("Server IP:", "🧀GoldenCasino.khplay.nl🧀")
    //         .addField("Server Status", "🛠️Maintenance🛠️")
    //         .setTimestamp()
    //         .setFooter(`Requested by: ${message.author}`);
        
 
    //     return message.channel.send(serverEmbed);
    // }

    //if (cmd === `${prefix}kick`) {
    

        // if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry, but you do not have permission for that!");

        // if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Sorry, but you do not have permission for that!");

        // if (!args[1]) return message.reply("Please specify a user for this command.");

        // if (!args[2]) return message.reply("Please specify a reason.");

        // var kick = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

        // var reason = args.slice(2).join(" ");

        // if (!kick) return message.reply("User not found.");

        // var embedPrompt = new discord.MessageEmbed()
        //     .setColor("GREEN")
        //     .setTitle("React on this message in 30 seconds to verify your kick.")
        //     .setDescription(`Do you really want to kick ${kick}?`);

        // var embed = new discord.MessageEmbed()
        //     .setColor("GREEN")
        //     .setFooter(message.member.displayName)
        //     .setTimestamp()
        //     .setDescription(`**Kicked user:** ${kick}
        //     **Kicked by:** ${message.author}
        //     **Reason:** ${reason}`);

        
        //     message.channel.send(embedPrompt).then(async msg =>{

        //         var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"] );

        //         if(emoji === "✅"){

        //             msg.delete();

        //             kick.kick(reason).catch(err =>{
        //                 if(err) return message.reply("Something went wrong!");
        //             });

        //             message.channel.send(embed);

        //         } else if(emoji === "❌"){

        //             msg.delete();

        //             return message.reply("Kick succesfully cancelled!").then(m => m.delete(5000));

        //         }

        //     })

    //}

    // if (cmd === `${prefix}ban`) {
    

    //     if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Sorry, but you do not have permission for that!");

    //     if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("Sorry, but you do not have permission for that!");

    //     if (!args[1]) return message.reply("Please specify a user for this command.");

    //     if (!args[2]) return message.reply("Please specify a reason.");

    //     var ban = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

    //     var reason = args.slice(2).join(" ");

    //     if (!ban) return message.reply("User not found.");

    //     var embedPrompt = new discord.MessageEmbed()
    //         .setColor("GREEN")
    //         .setTitle("React on this message in 30 seconds to verify your ban.")
    //         .setDescription(`Do you really want to ban ${ban}?`);

    //     var embed = new discord.MessageEmbed()
    //         .setColor("GREEN")
    //         .setFooter(message.member.displayName)
    //         .setTimestamp()
    //         .setDescription(`**Banned user:** ${ban}
    //         **Banned by:** ${message.author}
    //         **Reason:** ${reason}`);

        
    //         message.channel.send(embedPrompt).then(async msg =>{

    //             var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"] );

    //             if(emoji === "✅"){

    //                 msg.delete();

    //                 ban.ban(reason).catch(err =>{
    //                     if(err) return message.reply("Something went wrong!");
    //                 });

    //                 message.channel.send(embed);

    //             } else if(emoji === "❌"){

    //                 msg.delete();

    //                 return message.reply("Ban succesfully cancelled!").then(m => m.delete(5000));

    //             }

    //         })

    //}

});

async function promptMessage(message, author, time, reactions){

    time *=1000;

    for(const reaction of reactions){
        await message.react(reaction);
    }

    var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;
    
    return message.awaitReactions(filter, {max:1, time: time}).then(collected => collected.first() && collected.first().emoji.name);

}