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
            .setDescription("Make an poll using: ```/poll (You're Message)```")
            .setFooter(config.footer)
            .setTimestamp();

        return message.channel.send(embed);

    }

    var argsList = args.join(" ").split(seperator);

    if (argsList[1] === undefined) argsList[1] = "Undefined";

    var options = {

        bericht: argsList[0] || "Undefined",

    }

    var embedPoll = new discord.MessageEmbed()
        .setTitle(`:books: New Poll!`)
        .setColor(config.color)
        .setDescription(`${options.bericht}`)
        .setFooter(config.footer)
        .setTimestamp();

        let msgEmbed = await message.channel.send(embedPoll)
        await msgEmbed.react('👍')
        await msgEmbed.react('👎')

}

module.exports.help = {
    name: "poll",
    description: "Geeft al de verschillende commands",
    category: "Informatie"
}