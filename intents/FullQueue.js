const PrintQueueManager = require('../services/printQueueService');

module.exports = async () => {
    const queue = PrintQueueManager.getQueue();

    let message = `There are currently ${queue.length} prints queued up:\r\n`;
    message += queue.map(job => {
        return `*${job.userName}: ${job.thingName} (${job.url})\r\n`;
    });

    return message;
}