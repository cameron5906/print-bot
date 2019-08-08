const { RTMClient } = require('@slack/rtm-api');
const SlackWeb = require('./slack');
const token = process.env.SLACK_TOKEN;
const BOT_ID = 'UJXHLF3RN'

const messageProcessor = require('./messageProcessor');

const rtm = new RTMClient(token);
rtm.start()
    .catch(ex => console.log(ex));

rtm.on('ready', async () => {
    console.log('Connected to Slack RTM');
});

rtm.on('message', async (event) => {
    console.log(event);
    if(event.subtype === 'message_replied') {
        event = event.message;
    }

    const isBotMentioned = event.text.indexOf(`<@${BOT_ID}>`) !== -1;
    const isPrivate = event.channel.indexOf("D") === 0;

    if(event.type !== 'message') return;
    if(event['bot_id']) return;
    
    
    if(!isBotMentioned && !isPrivate) return;
    const response = await messageProcessor(event);
    SlackWeb.sendMessage(response, event.channel, event.thread_ts || false);
});