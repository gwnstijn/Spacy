const discord = require('discord.js')
const config = require("../data/config.json");

module.exports.run = async (bot, message, args) => {

    let responses = ['8D', '8=D', '8==D', '8===D', '8====D', '8=====D', '8======D', '8=======D', '8=======D', '8=========D', '8==========D', '8====================================D'];
        let response = Math.floor(Math.random() * responses.length);
        var myInfo = new discord.MessageEmbed()
            .setTitle(message.author.username)
            .setDescription(responses[response])
            .setColor([255, 0, 255])
            .setFooter(config.footer)
            .setTimestamp();
            message.channel.send(myInfo);

    }

//name this whatever the command name is.
module.exports.help = {
  name: "penis"
}