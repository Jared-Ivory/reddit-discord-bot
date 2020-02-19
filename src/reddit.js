let {
    REDDIT_USER_AGENT,
    REDDIT_SECRET,
    REDDIT_REFRESH_TOKEN,
    REDDIT_CLIENT_ID,
} = require('../config.json');
let snoowrap = require('snoowrap');

const r = new snoowrap({
    userAgent: REDDIT_USER_AGENT,
    clientId: REDDIT_CLIENT_ID,
    clientSecret: REDDIT_SECRET,
    refreshToken: REDDIT_REFRESH_TOKEN,
});


// setInterval(() => {
//     console.log('getting data...');
//     r.getHot()
//         .map(post => post.title)
//         .then(console.log);
// }, 30000);

module.exports = r;