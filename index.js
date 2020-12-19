// Loading all the requirements!
const discord = require("discord.js");
const config = require("./data/config.json");
const fs = require("fs");
const { isFunction } = require("util");
const client = new discord.Client();
client.commands = new discord.Collection();
const activeSongs = new Map();

// Start the bot!
client.login(config.token);

//  Command handler
fs.readdir("./cmds/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("[Spacy] No Commands Found!");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./cmds/${f}`);
        console.log(`[Spacy] The file ${f} is loaded!`);

        client.commands.set(fileGet.help.name, fileGet);
    });

});


// Ready Event!
client.on("ready", async () => {
 
    console.log(`${client.user.username} is online.`);
 
    client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
 
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});

// Guild Create Event
client.on("guildCreate", function(guild){

    console.log("I'm added to a new server!")
    client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
    const JoinEmbed = new discord.MessageEmbed()
     .setTitle("Thanks for adding me! :partying_face:")
     .setDescription("**-** My prefix is **/**!\n**-** Type **/help** for a list off commands!\n\n**-** Invite Me!\n https://discord.com/api/oauth2/authorize?client_id=785476232367046656&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%2Fcallback&scope=bot\n\n**-** Support Server\n https://discord.gg/KKprHha7");
    

    guild.channels.cache.filter(c => c.type === 'text').find(p => p.position === 0).send(JoinEmbed);
});

// Message Event
client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = config.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if (!message.content.startsWith(prefix)) return;

    var arguments = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length));

    var ops = {
        active: activeSongs
    };

    if (commands) commands.run(client, message, arguments, ops);
    
    if (command === `${prefix}logtests`){
        console.log("Logged Error")
    }
    
    if (command === `${prefix}servers`){
        return message.channel.send(`Serving ${client.guilds.cache.size} servers`)
    }

});

