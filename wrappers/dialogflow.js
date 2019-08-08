const apiai = require('apiai');
const DIALOGFLOW_TOKEN = process.env.DIALOGFLOW_TOKEN;

class Dialogflow {
    constructor() {
        this.instance = new apiai(DIALOGFLOW_TOKEN);
    }

    async process(userId, text) {
        return new Promise((resolve, reject) => {
            const request = this.instance.textRequest(text, {sessionId: userId});

            request.on('response', response => {
                resolve(response);
            });

            request.on('error', error => {
                reject(error);
            });

            request.end();
        });
    }
}

module.exports = new Dialogflow;