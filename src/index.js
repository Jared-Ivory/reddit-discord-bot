const {prefix, discordToken} = require('../config.json');

//Node related modules
const fs = require('fs');
const path = require('path');

//Discordjs related modules
const Discord = require('discord.js');
const client = new Discord.Client();

const cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync(path.resolve(__dirname, './commands')).filter(file => file.endsWith('.js'));
commandFiles.map(command => {
    command = require(`./commands/${command}`)
    // set a new item in the Collection
	// with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
})


client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    //log the direct message recieved
    console.log(message.content);

    let {commandName, args} = parseMessage(message)

    handleCommand(commandName, args);
});


function parseMessage(message){
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    //Message is seperated into its command and arguments passed.
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    return commandName, args;
}

function handleCommand(commandName, args){
    //If our collection of commands contains the passed command execute its function
    if(!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);

    if(command.guildOnly && message.channel.type !== 'text'){
        return message.reply('I can\'t execute that command inside DMs!');
    }
    if(command.args && !args.length){
        return message.channel.send(`You didn't provide any arguments, ${message.author}`)
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
    } catch(err) {
        console.log(err)
    }
}


client.login(discordToken);