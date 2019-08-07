const request = require('request');
const Slack = require('../slack');
const PrintQueueManager = require('../printQueueManager');
const Thingiverse = require('../thingiverse');

module.exports = async (userInfo, url) => {
    const thingInfo = await Thingiverse.getThingInfo(url);
    const currentPrintsQueued = PrintQueueManager.getQueue().length;
    PrintQueueManager.addToQueue(userInfo.id, userInfo.name, url, thingInfo.title, thingInfo.imageUrl, thingInfo.category);

    if(!PrintQueueManager.getCurrentPrint() && currentPrintsQueued === 0) {
        //TODO: send message to the admins to slice the model and hand over the gcode since there is no active print going
        return `Got it; there are no other requests in queue, so I will send this in to get sliced immediately and will notify you when the print begins.`;
    } else {
        return `Okay, I've added "${thingInfo.title}" from the ${thingInfo.category} category to the queue. There are ${currentPrintsQueued} prints ahead of you; I will let you know when Cameron loads the model.`;
    }
}