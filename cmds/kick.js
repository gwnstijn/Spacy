const discord = require("discord.js");
const fs = require("fs");
const config = require("../data/config.json");
module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(config.noperms);
    var kickUser = message.guild.member(message.mentions.users.first());
    if (!kickUser) return message.channel.send(config.provideauser);

    var reason = args.join(" ").slice(22);
    if (!reason) return message.channel.send(config.provideareason)

    if (kickUser.hasPermission("KICK_MEMBERS")) return message.channel.send(config.ihavenoperms);

    var kickEmbed2 = new discord.MessageEmbed()
        .setTitle(`You have been kicked from  ${message.guild.name}!`)
        .setColor(config.color)
        .addField("By:", message.author.tag)
        .addField("Reason:", reason)
        .setFooter(config.footer)
        .setTimestamp();


    kickUser.send(kickEmbed2).then(function () {
        message.guild.member(kickUser).kick({ days: 7, reason: reason })
        return message.channel.send("The given user has been successfully kicked and has successfully received a notification!");
    }).catch(function () {
        message.guild.member(kickUser).kick(reason);
        return message.channel.send("The given user has been successfully kicked, but has not received a notification");
    });
}

module.exports.help = {
    name: "kick",
    description: "Kick een gebruiker van de server."
}