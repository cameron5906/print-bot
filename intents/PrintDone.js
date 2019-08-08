const PrintQueueManager = require('../services/printQueueService');

module.exports = async (userInfo) => {
    const currentPrint = PrintQueueManager.getCurrentPrint();

    if(!currentPrint) return `I was not aware of an active print; did you make a mistake?`;

    PrintQueueManager.removeCurrentPrint();

    const nextUp = PrintQueueManager.getNextInQueue();

    if(nextUp) {
        return [{text: `Sounds good.`}, {channel: 'CJF9T5691', text: `Up next is "${nextUp.title}" for ${nextUp.userName}!`}];
    } else {
        return [{text: 'Got it.'}, {channel: 'CJF9T5691', text: 'FYI: The printer just freed up; let me know if you want something printed!'}];
    }
}