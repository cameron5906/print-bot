const PrintQueueManager = require('../services/printQueueService');

module.exports = async (userInfo) => {
    const queue = PrintQueueManager.getQueue();
    if(queue.length === 0) return `You don't seem to have any prints requested right now.`;
    PrintQueueManager.removeFromQueue(userInfo.id);
    return `Okay, I've removed your print request(s).`;
}