const PrintQueueManager = require('../services/printQueueService');

module.exports = async () => {
    const nextPrint = PrintQueueManager.getNextInQueue();

    if(!nextPrint) return `There are no prints currently queued up at the moment.`;

    return `Next up is "${nextPrint.thingName}" for ${nextPrint.userName} (${nextPrint.url})`;
}