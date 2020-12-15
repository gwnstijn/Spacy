const discord = require("discord.js");
const config = require("../data/config.json");


module.exports.run = async (client, message, args) => {

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const embed = new discord.MessageEmbed()
        .setTitle(`${user.user.username}'s Avatar`)
        .setColor(`#f3f3f3`)
        .setImage(`${user.user.displayAvatarURL()}`)
        .setFooter(config.footer)
        .setTimestamp();
        
    
    await message.channel.send(embed)
    }

module.exports.help = {
    name: "avatar",
    description: "Geeft al de verschillende commands",
    category: "Informatie"
}