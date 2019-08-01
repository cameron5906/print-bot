const { RTMClient } = require('@slack/rtm-api');
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
    if(event.channel !== 'CJF9T5691') return;
    if(event.type !== 'message') return;
    if(event['bot_id']) return;
    
    if(event.subtype === 'message_replied') {
        event = event.message;
    }
    
    if(event.text.indexOf(`<@${BOT_ID}>`) === -1) return;
    const response = messageProcessor(event);
    rtm.sendMessage(response, event.channel);
});