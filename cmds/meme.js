const discord = require("discord.js");
const randomPuppy = require("random-puppy");
const config = require("../data/config.json");


module.exports.run = async (client, message, args) => {

        // you can put the subreddits you want to grab memes from
        const subReddits = ["dankmeme", "meme", "me_irl"];
        // Grab a random property from the array
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        // Get a random image from the subreddit page
        const img = await randomPuppy(random);
        var embed = new discord.MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`You're Meme Sir!`)
            .setURL(`https://reddit.com/r/${random}`)
            .setFooter(config.footer)
            .setTimestamp();

        message.channel.send(embed);
    }

module.exports.help = {
    name: "meme",
    description: "Geeft al de verschillende commands",
    category: "Informatie"
}