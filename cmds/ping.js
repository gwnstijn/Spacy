const Discord = require("discord.js");
const config = require("../data/config.json");

module.exports.run = async (client, message, args) => {

    var ledenEmbed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setTitle(":books: You're Ping!")
        .setDescription("Pong: " + (message.createdTimestamp - Date.now()) + " ms :ping_pong:")
        .setFooter(config.footer)
        .setTimestamp();

    message.channel.send(ledenEmbed);


}

module.exports.help = {
    name: "ping",
    description: "Geeft al de verschillende commands",
    category: "Informatie"
}