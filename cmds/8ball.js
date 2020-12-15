const Discord = require('discord.js');
const config = require("../data/config.json");
module.exports.run = async (bot, message, arguments) => {

  let args = message.content.split(" ").slice(0);
  let question = args.slice(1).join(" ");

  if(!question) return message.reply('You need to specify a question!');
  else {
      let answers = [
      'Yes',
      'No',
      'Maybe',
      'Of course!',
      'I don\'t know...',
  ];
      let response = answers[Math.floor(Math.random() * answers.length)];

      let embed = new Discord.MessageEmbed()
          .setTitle('Spacy | 8Ball')
          .setColor(config.color)
          .addField('Question: ', question)
          .addField('Answer: ', response)
          .setFooter(config.footer)
          .setTimestamp();
      message.channel.send(embed);

    }
}


module.exports.help = {
    name: "8ball",
    description: "Verban een gebruiker van de server."
}