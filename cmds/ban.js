const discord = require("discord.js");
const fs = require("fs");
const config = require("../data/config.json");
module.exports.run = async (bot, message, args) => {

    var embed = new discord.MessageEmbed()
    .setTitle("Usage:")
    .setColor("#00ee00")
    .setDescription("Ban a user using: ```/ban (User) (Reason)```")
    .setFooter(config.footer)
    .setTimestamp();

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(config.noperms);
    var banUser = message.guild.member(message.mentions.users.first());
    if (!banUser) return message.channel.send(embed);

    var reason = args.join(" ").slice(22);
    if (!reason) return message.channel.send(embed);

    if (banUser.hasPermission("BAN_MEMBERS")) return message.channel.send(config.ihavenoperms);

    var banEmbed2 = new discord.MessageEmbed()
        .setTitle(`You have been banned from  ${message.guild.name}!`)
        .setColor(config.color)
        .addField("By:", message.author.tag)
        .addField("Reason:", reason)
        .setFooter(config.footer)
        .setTimestamp();


    banUser.send(banEmbed2).then(function () {
        message.guild.member(banUser).ban({ days: 7, reason: reason })
        return message.channel.send("The given user has been successfully banned and has successfully received a notification!");
    }).catch(function () {
        message.guild.member(banUser).ban(reason);
        return message.channel.send("The given user has been successfully banned, but has not received a notification");
    });
}

module.exports.help = {
    name: "ban",
    description: "Verban een gebruiker van de server."
}