const { RTMClient } = require('@slack/rtm-api');
const SlackWeb = require('./wrappers/slack');
const UserService = require('./services/userService');
const EventService = require('./services/eventService');

const token = process.env.SLACK_TOKEN;
const BOT_ID = 'UJXHLF3RN'

const messageProcessor = require('./services/messageProcessingService');
const fileProcessor = require('./services/fileProcessingService');

EventService.start('printEnded', EventService.printEndedEvent, 5000);

const rtm = new RTMClient(token);
rtm.start()
    .catch(ex => console.log(ex));

rtm.on('ready', async () => {
    console.log('Connected to Slack RTM');
});

rtm.on('message', async (event) => {
    
    if(event.subtype === 'message_replied') {
        event = event.message;
    }
    
    const userRole = await UserService.getRole(event.user);
    const isBotMentioned = event.text.indexOf(`<@${BOT_ID}>`) !== -1;
    const isPrivate = event.channel.indexOf("D") === 0;

    if(event.type !== 'message') return;
    if(event['bot_id']) return;
    
    let response = '';

    if(!isBotMentioned && !isPrivate) return;
    if(event.files) {
        if(userRole !== "admin") {
            response = `Sorry, only users with the role "admin" can provide me with files!`;
        } else if(userRole === "admin" && !isPrivate) {
            response = `Sorry, please send me files in a DM.`;
        } else {
            response = await fileProcessor(event.files[0]);
        }
    } else {
        response = await messageProcessor(event);
    }

    if(response) {
        if(typeof response === 'object') {
            response.forEach(msg => {
                if(msg.channel) {
                    SlackWeb.sendMessage(msg.text, msg.channel, false);
                } else {
                    SlackWeb.sendMessage(msg.text, event.channel, event.thread_ts || false);
                }
            });
        } else {
            SlackWeb.sendMessage(response, event.channel, event.thread_ts || false);
        }
    }
});