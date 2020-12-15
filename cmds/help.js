const discord = require("discord.js");
const config = require("../data/config.json");

module.exports.run = async (client, message, args) => {

    var ledenEmbed = new discord.MessageEmbed()
        .setColor("#347deb")
        .setDescription(":gear: **| Admin**\n`ban`, `kick`, `clear`, `lock`, `slowmode`, `announcement`, `poll`\n\n:joy: **| Fun**\n`avatar`, `meme`, `penis`, `8ball`\n\n:information_source: **| Info**\n`covid`, `help`, `ping`, `user`, `info`")
        .setFooter(config.footer)
        .setTimestamp();
    message.channel.send(ledenEmbed);

}

module.exports.help = {
    name: "help",
    description: "Geeft al de verschillende commands",
    category: "Informatie"
}