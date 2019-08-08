const request = require('request');
const Slack = require('../wrappers/slack');
const PrintQueueManager = require('../services/printQueueService');
const Thingiverse = require('../wrappers/thingiverse');
const UserService = require('../services/userService');

module.exports = async (userInfo, url) => {
    const thingInfo = await Thingiverse.getThingInfo(url);
    const currentPrintsQueued = PrintQueueManager.getQueue().length + (PrintQueueManager.getCurrentPrint() ? 1 : 0);
    PrintQueueManager.addToQueue(userInfo.id, userInfo.name, url, thingInfo.title, thingInfo.imageUrl, thingInfo.category);

    if(!PrintQueueManager.getCurrentPrint() && currentPrintsQueued === 0) {
        UserService.getByRole('admin').forEach(async (user) => {
            const userId = await Slack.getUserIdFromUsername(user.username);
            Slack.sendMessage(`A new print request has appeared! ${url}`, userId);
        });

        return `Got it; there are no other requests in queue, so I will send this in to get sliced immediately and will notify you when the print begins.`;
    } else {
        return `Okay, I've added "${thingInfo.title}" from the ${thingInfo.category} category to the queue. There are ${currentPrintsQueued} prints ahead of you; I will let you know when Cameron loads the model.`;
    }
}