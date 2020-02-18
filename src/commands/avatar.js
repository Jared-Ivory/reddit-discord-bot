module.exports = {
    name: 'avatar',
    aliases: ['icon', 'pfp'],
    description: 'Gets the URL of the avatars of mentioned users.',
    execute(message, args) {
        if (!message.mentions.users.size) {
            return message.channel.send(
                `Your avatar: <${message.author.displayAvatarURL}>`
            );
        }
        let avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: <${user.displayAvatarURL}>`;
        });

        message.channel.send(avatarList);
    },
};
