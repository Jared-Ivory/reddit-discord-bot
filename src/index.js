const {prefix, token} = require('../config.json');

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    console.log(message.content);

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === 'args-info') {
        if(!args.length){
            return message.channel.send(`You didn't provide any arguments, ${message}`)

        }

        message.channel.send(`Command name: ${command}\nArguments: ${args}`)
    }

    else if(command === 'kick'){
        const taggedUser = message.mentions.users.first();

        message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    }

});

client.login(token);