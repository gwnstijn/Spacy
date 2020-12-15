const Discord = require("discord.js");
const axios = require('axios');
const config = require("../data/config.json");

module.exports.run = async (client, message, args) => {

    const baseUrl = "https://corona.lmao.ninja/v2";

    let url, response, corona;

    try {
        url = args[0] ? `${baseUrl}/countries/${args[0]}`:`${baseUrl}/all`
        response = await axios.get(url)
        corona = response.data
    } catch (error) {
        return message.channel.send(`***${args[0]}*** doesn't exist, or data isn't being collected`)
    }

    const embed = new Discord.MessageEmbed()
        .setTitle(args[0] ? `${args[0].toUpperCase()} Stats` : 'Total Corona Cases World Wide')
        .setColor('#fb644c')
        .setThumbnail(args[0] ? corona.countryInfo.flag : 'https://i.giphy.com/YPbrUhP9Ryhgi2psz3.gif')
        .setFooter(config.footer)
        .setTimestamp()
        .addFields(
            {
                name: 'Total Cases:',
                value: corona.cases.toLocaleString(),
                inline: true
            },
            {
                name: 'Total Deaths:',
                value: corona.deaths.toLocaleString(),
                inline: true
            },
            {
                name: 'Total Recovered:',
                value: corona.recovered.toLocaleString(),
                inline: true
            },
            {
                name: 'Active Cases:',
                value: corona.active.toLocaleString(),
                inline: true
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: true
            },
            {
                name: 'Critical Cases:',
                value: corona.critical.toLocaleString(),
                inline: true
            },
            {
                name: 'Today Recoveries:',
                value: corona.todayRecovered.toLocaleString().replace("-", ""),
                inline: true
            },
            {
                name: 'Todays Deaths:',
                value: corona.todayDeaths.toLocaleString(),
                inline: true
            })

    await message.channel.send(embed)
}

module.exports.help = {
    name: "covid",
    description: "Geeft al de verschillende commands",
    category: "Informatie"
}