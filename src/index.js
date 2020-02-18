const { prefix, discordToken } = require('../config.json');
const { CommandDispatcher } = require('../src/command-dispatcher');

//Discordjs related modules
const Discord = require('discord.js');
const client = new Discord.Client();
const commandDispatcher = new CommandDispatcher(client);

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    //log the direct message recieved
    console.log(
        `${message.channel.name.toUpperCase()}~${
            message.author.username
        }: ${message}`
    );

    //Check to see if begins with set prefix and if it is from bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    commandDispatcher.dispatch(message);
});

client.login(discordToken);
