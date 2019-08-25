const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config')
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  if (msg.channel.name == "commands"){
    if (msg.content.startsWith("-post ")) {
      msg.content = msg.content.replace("-post ", "");
      var embed_array = msg.content.split("; ", 2);
      console.log(embed_array);
      if (embed_array.length != 2){
          msg.reply("shit dude, you forgot a field or two");
          msg.channel.send("Use: -post Brief Description; Full Description");
          return;
      }
      embed_array.unshift(msg.author.username);
      client.channels.find("name","scams-and-issues").send({embed: scamPostEmbed(embed_array)});
      
      
    }
  }
  if (msg.content.startsWith("-findscam")){
    client.channels.find("name","scams-and-issues").send("Found!");
  }
  
  if (msg.content.startsWith("-github")){
    msg.reply("https://github.com/MegamanBn/Hilltop-Bot");
  }
});

client.login(config.token);





function scamPostEmbed(embed_array) {
    return {
      //title: "Scam/Issue Post",
      type: "rich",
      color: 0x3c42c3,
      fields:[
        {name: "Brief Description", value: embed_array[1]},
        {name: "Submitted by", value: embed_array[0], inline: true},
        {name: "Date", value: getTodayDate(), inline: true},
        //{name: '\u200B', value: '',},
        {name: "Full Description:", value: "\n" + embed_array[2]}
      ]
    }; 
}
function getTodayDate(){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  return today;   
}
