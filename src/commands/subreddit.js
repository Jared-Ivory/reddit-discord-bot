const reddit = require('../reddit');
const Discord = require('discord.js');

module.exports = {
    name: 'subreddit',
    description: 'Gets Y amount of posts from the subreddit X',
    cooldown: 30,
    async execute(message, args) {
        message.channel.send(`Collecting ** r\\${args[0]}\\ ** data...`);
        console.log(args)
        //console.log(message);
        let frontpage = await await reddit.getHot(args[0], { amount: 3, limit: 3});
        frontpage.map(submission => {

            console.log("Submission |", submission.title, submission.permalink, submission.thumbnail, submission.author.name)
            message.channel.send(
                new Discord.RichEmbed()
                    .setColor('#0099ff')
                    .setTitle(submission.title)
                    .setURL(`https://reddit.com${submission.permalink}`)
                    .setImage(submission.thumbnail)
                    .setTimestamp()
            );
        });
    },
};
