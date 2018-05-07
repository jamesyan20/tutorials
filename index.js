const Discord = require('discord.js'); // Discrd.JS package
const client = new Discord.Client(); // New Discord Client
const prefix = '!'; // Commands Prefix

client.on('ready', () => { // Ready Event
  console.log('Bot has started!');
});

client.on('message', message => { // Message Event
  if (message.author.bot) return undefined; // Bot doesn't reply to itself
  let msg = message.content.toLowerCase(); // Message's content to lowercase letter
  let args = message.content.slice(prefix.length).trim().split(' '); // Arguments 
  let command = args.shift().toLowerCase(); // Shift arguments to lower case
  
  try {
    let commands = require(`./commands/${command}.js`); // Running commands folder and files
    commands.run(client, message, args); // Run events
  } catch (e) {
    console.log(e.stack); // Sends the error in console
  } finally {
    console.log(`${message.author.tag} used ${command} command`);
  }
});

client.login(process.env.SECRET); // My token is hidden