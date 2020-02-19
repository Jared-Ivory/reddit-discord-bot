const reddit = require('../reddit');
const Discord = require('discord.js');

module.exports = {
    name: 'frontpage',
    description: 'Gets the top posts from the front page of reddit',
    cooldown: 30,
    async execute(message, args) {
        message.channel.send('Collecting Front Page data...');
        //console.log(message);
        let frontpage = await await reddit.getHot({ limit: 5 });
        frontpage.map(submission => {

            console.log("Submission |", submission.title, submission.permalink, submission.thumbnail, submission.author.name)
            message.channel.send(
                new Discord.RichEmbed()
                    .setColor('#0099ff')
                    .setTitle(submission.title)
                    .setURL(`https://reddit.com${submission.permalink}`)
                    .setAuthor(submission.author.name)
                    .setDescription('Some description here')
                    .setThumbnail(submission.thumbnail)
                    .addField('Regular field title', 'Some value here')
                    .addBlankField()
                    .addField('Inline field title', 'Some value here', true)
                    .addField('Inline field title', 'Some value here', true)
                    .addField('Inline field title', 'Some value here', true)
                    .setImage(submission.thumbnail)
                    .setTimestamp()
                    .setFooter(
                        'Some footer text here',
                        'https://i.imgur.com/wSTFkRM.png'
                    )
            );
        });
    },
};
