const discord = require("discord.js");
const config = require("../data/config.json");

module.exports.run = async (client, message, args) => {

    var ledenTotal = message.guild.memberCount;
    var bots = message.guild.members.cache.filter(m => m.user.bot).size;
    var people = ledenTotal - bots;
    var online = message.guild.members.cache.filter(m => m.user.presence.status == "online" || m.user.presence.status == "dnd" || m.user.presence.status == "idle").size;

    var ledenEmbed = new discord.MessageEmbed()
        .setColor("#00FF00")
        .setTitle(":books: Members")
        .addField("Members", ledenTotal, true)
        .addField("Online", online, true)
        .setFooter(config.footer)
        .setTimestamp();

    message.channel.send(ledenEmbed);

}

module.exports.help = {
    name: "members",
    description: "Geeft al de verschillende commands",
    category: "Informatie"
}