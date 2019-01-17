const Discord = require("discord.js");
const fs = require("fs");
const mkdirp = require("mkdirp");
const {Client, Attachement} = require("discord.js");
const client =  new Discord.Client();
require("dotenv").config();
const key = process.env.BOT_TOKEN

client.on("ready", () => {
    console.log("Lets start mapping!")
});

const mapping = {
    fullmap: "https://cdn.discordapp.com/attachments/531274799591325736/532653615459074060/MapImg.jpg",
    a: {
        one: "https://cdn.discordapp.com/attachments/532354640784654338/534424332647137300/row-1-col-1.png",
        two: "https://cdn.discordapp.com/attachments/534425436050948096/534425578657415178/row-2-col-1.png",
        three: "https://cdn.discordapp.com/attachments/534425436050948096/534425718919135242/row-3-col-1.png",
        four: "https://cdn.discordapp.com/attachments/534425436050948096/534425817607045151/row-4-col-1.png",
        five: "https://cdn.discordapp.com/attachments/534425436050948096/534425950994169876/row-5-col-1.png"        
    },
    b: {
        one: "https://cdn.discordapp.com/attachments/534425436050948096/534425496050466817/row-1-col-2.png",
        two: "https://cdn.discordapp.com/attachments/534425436050948096/534425596533407744/row-2-col-2.png",
        three: "https://cdn.discordapp.com/attachments/534425436050948096/534425743393030159/row-3-col-2.png",
        four: "https://cdn.discordapp.com/attachments/534425436050948096/534425837769064488/row-4-col-2.png",
        five: "https://cdn.discordapp.com/attachments/534425436050948096/534425968178102292/row-5-col-2.png"
    },
    c: {
        one: "https://cdn.discordapp.com/attachments/534425436050948096/534425521342382090/row-1-col-3.png",
        two: "https://cdn.discordapp.com/attachments/534425436050948096/534425673222324225/row-2-col-3.png",
        three: "https://cdn.discordapp.com/attachments/534425436050948096/534425763311517696/row-3-col-3.png",
        four: "https://cdn.discordapp.com/attachments/534425436050948096/534425870345961483/row-4-col-3.png",
        five: "https://cdn.discordapp.com/attachments/534425436050948096/534425981960585246/row-5-col-3.png"
    },
    d: {
        one: "https://cdn.discordapp.com/attachments/534425436050948096/534425537247051786/row-1-col-4.png",
        two: "https://cdn.discordapp.com/attachments/534425436050948096/534425686153363468/row-2-col-4.png",
        three: "https://cdn.discordapp.com/attachments/534425436050948096/534425782106325044/row-3-col-4.png",
        four: "https://cdn.discordapp.com/attachments/534425436050948096/534425912163434506/row-4-col-4.png",
        five: "https://cdn.discordapp.com/attachments/534425436050948096/534426006497263627/row-5-col-4.png"
    },
    e: {
        one: "https://cdn.discordapp.com/attachments/534425436050948096/534425548559220737/row-1-col-5.png",
        two: "https://cdn.discordapp.com/attachments/534425436050948096/534425701168840715/row-2-col-5.png",
        three: "https://cdn.discordapp.com/attachments/534425436050948096/534425803128045590/row-3-col-5.png",
        four: "https://cdn.discordapp.com/attachments/534425436050948096/534425932644220959/row-4-col-5.png",
        five: "https://cdn.discordapp.com/attachments/534425436050948096/534426022595264559/row-5-col-5.png"
    },
    info: {
        fullmap: "If you need a closer view use ^enhance [tilenumber]\n ex: ^enhance a1",
        tile: "If you need a full view of the map use ^fullmap"
    },
    grid: "https://cdn.discordapp.com/attachments/534425436050948096/535289888141082635/fullmapGrid.png"
}
function getMapEmbed(title, author, authorIcon, mapImage, authorMessage) {
    const embed = new Discord.RichEmbed()
      .setTitle("Here is your map of " + title + ":")
      .setAuthor(author, authorIcon)
      /*
       * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
       */
      .setColor(0x00AE86)
      .setDescription(authorMessage)
      .setFooter("Have a nice day!")
      .setImage(mapImage)
      .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FraMauroDetailedMap.jpg/310px-FraMauroDetailedMap.jpg")
      /*
       * Takes a Date object, defaults to current date.
       */
      .setTimestamp()
      .addField("Link to the live map!", "http://181.215.47.51:58268/")
      .setURL("http://181.215.47.51:58268/")
      return embed;
}
function getCommands(author, authorIcon, message){
const commandsEmbed = new Discord.RichEmbed()
    .setTitle("Here is a list of my commands:")
    .setAuthor(author, authorIcon)
    .setColor(0x00AE86)
    .setDescription(message)
    .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FraMauroDetailedMap.jpg/310px-FraMauroDetailedMap.jpg")
    .setTimestamp()
    .addField("Link to the live map!", "http://181.215.47.51:58268/")
    return commandsEmbed
}

const commandsList = [
    "Use '^' to call the bot.",
    "ex. ^[Command Word] ^map",
    "Command words:",
    "fullmap/map: Give the user the full map of the server.",
    "enhance/e[tilename]: Give an enhanced view of a specific tile.",
    "ex. ^enhance a1",
    "grid: shows a map with grid overlay.",
    "h/help/carto/commands/cmds: shows this list."
].join("\n")
 

client.on("message", message => {
    if(message.content.substring(0, 1) == "^"){
        var args = message.content.substring(1).split(" ")
        var cmd = args[0];

        args = args.splice(1);

        switch (cmd){
            case "map":
            case "fullmap":
            message.author.send(getMapEmbed("the World", message.author.username, message.author.avatarURL, mapping.fullmap, mapping.info.fullmap))
            break;
            case "e":
            case "enhance":
            // console.log(args)
            if(args[0] != null){
                var readArg = args.toString().split("");
                // console.log(readArg)
                var letter = readArg[0].toString().toLowerCase();
                var number = readArg[1];
                number = numberSwitch(number);
                var finalTile = mapping[`${letter}`][`${number}`];
                // console.log(letter + number);
                message.author.send(getMapEmbed(args[0].toString(), message.author.username, message.author.avatarURL, finalTile, mapping.info.tile))
                function numberSwitch(arg){
                    switch(arg){
                        case "1":
                        arg = "one";
                        return arg;
                        case "2":
                        arg = "two";
                        return arg;
                        case "3":
                        arg = "three";
                        return arg;
                        case "4":
                        arg = "four";
                        return arg;
                        case "5":
                        arg = "five";
                        return arg;
                    }
                }
            } else {
                message.author.send("Please enter your tile number! ex. a1")
            }
            break;
            case "h":
            case "help":
            case "carto":
            case "commands":
            case "cmds":
                getCommands(message.author.username, message.author.avatarURL, commandsList);
            break;
            case "grid":
                message.author.send(getMapEmbed(args[0].toString(), message.author.username, message.author.avatarURL, mapping.grid, mapping.info.tile))
            break;
        }
    }
});

client.on("error", console.error)

client.login(key);