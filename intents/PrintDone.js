const PrintQueueManager = require('../services/printQueueService');

module.exports = async (userInfo) => {
    const currentPrint = PrintQueueManager.getCurrentPrint();

    if(!currentPrint) return `I was not aware of an active print; did you make a mistake?`;

    PrintQueueManager.removeCurrentPrint();

    const nextUp = PrintQueueManager.getNextInQueue();

    if(nextUp) {
        return [{text: `Sounds good. Here is the next print in queue: ${nextUp.url}`}, {channel: 'CJF9T5691', text: `Up next is "${nextUp.title}" for ${nextUp.userName}! I will update you when finished.`}];
    } else {
        return [{text: 'Got it.'}, {channel: 'CJF9T5691', text: 'FYI: The printer just freed up; let me know if you want something printed!'}];
    }
}