const { WebClient } = require('@slack/web-api');
const token = process.env.SLACK_TOKEN;

class Slack {
    constructor() {
        this.web = new WebClient(token);
    }

    async getUserInfo(userId) {
        const response = await this.web.users.info({user: userId});
        const user = response.user;

        return {
            id: user.id,
            name: user.real_name,
            username: user.name
        }
    }

    async uploadFile(channelId, data, filename) {
        await this.web.files.upload({
            channels: channelId,
            file: data,
            filename: filename
        });
    }

    async sendMessage(text, channel, thread) {
        let ops = {
            text,
            channel,
            markdwn: false
        }

        if(thread) {
            ops.thread_ts = thread;
        }

        await this.web.chat.postMessage(ops);
    }
}

module.exports = new Slack;