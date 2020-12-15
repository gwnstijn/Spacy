const discord = require("discord.js");
const config = require("../data/config.json");

module.exports.run = async (client, message, args) => {

    // !announcement title | bericht | kleur | kanaal

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(config.noperms);

    var seperator = "|";

    if (args[0] == null) {

        var embed = new discord.MessageEmbed()
        .setTitle("Usage:")
        .setColor("#00ee00")
        .setDescription("Make an announcement using: ```/announce (You're Message) (Channel)```")
        .setFooter(config.footer)
        .setTimestamp();

        return message.reply(embed);

    }

    var argsList = args.join(" ").split(seperator);

    if (argsList[2] === undefined) argsList[2] = "#eeeeee";
    if (argsList[3] === undefined) argsList[3] = "general";

    var options = {

        titel: argsList[0],
        bericht: argsList[1] || "Pecify a message",
        kanaal: argsList[2].trim()

    }

    var announceEmbed = new discord.MessageEmbed()
        .setTitle(`${options.titel}`)
        .setColor(config.color)
        .setDescription(`${options.bericht}`)
        .setFooter(config.footer)
        .setTimestamp();

    var channel = message.member.guild.channels.cache.find(channels => channels.name === options.kanaal);
    if (!channel) return message.reply("Channel not found!");

    channel.send(announceEmbed);

}

module.exports.help = {
    name: "announce",
    description: "Geeft al de verschillende commands",
    category: "Informatie"
}