const request = require('request');
const Slack = require('../slack');
const PrintQueueManager = require('../printQueueManager');
const Thingiverse = require('../thingiverse');

module.exports = async (userInfo, url) => {
    const thingInfo = await Thingiverse.getThingInfo(url);
    const currentPrintsQueued = PrintQueueManager.getQueue().length;
    PrintQueueManager.addToQueue(userInfo.id, userInfo.name, url, thingInfo.title, thingInfo.imageUrl, thingInfo.category);

    return `Okay, I've added "${thingInfo.title}" from the ${thingInfo.category} category to the queue. There are ${currentPrintsQueued} prints ahead of you; I will let you know when Cameron loads the model.`;
}