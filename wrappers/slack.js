const { WebClient } = require('@slack/web-api');
const request = require('request');
const fs = require('fs');
const token = process.env.SLACK_TOKEN;

class Slack {
    constructor() {
        this.web = new WebClient(token);
    }

    async getUserIdFromUsername(username) {
        const response = await this.web.users.list();
        return response.members.find(u => u.name === username).id;
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

    async getFileData(privateUrl) {
        const downloadId = new Date().getTime();

        return new Promise((resolve, reject) => {
            request({
                url: privateUrl,
                auth: {
                  bearer: 'xoxb-323434273830-643598513872-3qceeeG8MwEjgomQvyl4IrvP'  
                }
            }).pipe(fs.createWriteStream(`./${downloadId}`)).on('finish', () => {
                const data = fs.readFileSync(`./${downloadId}`);
                fs.unlinkSync(`./${downloadId}`);
                resolve(data);
            });
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